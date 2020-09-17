# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class VueStockForecast(models.AbstractModel):

    _name = "vue.stock.forecast"
    _description = "Vue Stock Forecast"

    def fetch(self, options):
        stock_data = self._get_stock_data(options)

        if options.get("groupBy") == "category":
            rows = self._make_product_category_rows(stock_data, options)
        else:
            rows = stock_data

        return sorted(
            list(rows.values()),
            key=lambda r: r["label"],
        )

    def _get_stock_data(self, options):
        products = self._get_products(options)
        result = {p.id: self._make_row_data(p) for p in products}

        incoming = self._get_incoming_stock_moves(products, options)
        for move in incoming:
            result[move.product_id]["incoming"].append(
                {"qty": move.product_qty, "date": move.date_expected}
            )

        outgoing = self._get_outgoing_stock_moves(products, options)
        for move in outgoing:
            result[move.product_id]["outgoing"].append(
                {"qty": move.product_qty, "date": move.date_expected}
            )

        quants = self._get_stock_quants(products, options)
        for quant in quants:
            result[quant.product_id]["currentStock"] += quant.quantity
            result[quant.product_id]["reserved"] += quant.reserved_quantity

        return result

    def _get_products(self, options):
        products = self.env["product.product"].search([
            "|",
            ["categ_id", "child_of", options.get("categories") or []],
            ["id", "in", options["products"]],
        ])
        return products.filtered(lambda p: p.type in ("product", "consu"))

    def _make_row_data(self, product):
        return {
            "label": product.display_name,
            "product_id": product.id,
            "uom": product.uom_id,
            "currentStock": 0,
            "reserved": 0,
            "incoming": [],
            "outgoing": [],
        }

    def _get_incoming_stock_moves(self, products, options):
        domain = [
            ("state", "not in", ["done", "cancel"]),
            ("location_id.usage", "!=", "internal"),
            ("location_dest_id.usage", "=", "internal"),
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append([
                ("location_dest_id", "child_of", options["locations"]),
            ])

        return self.env["stock.move"].search(domain)

    def _get_outgoing_stock_moves(self, products, options):
        domain = [
            ("state", "not in", ["done", "cancel"]),
            ("location_id.usage", "=", "internal"),
            ("location_dest_id.usage", "!=", "internal"),
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append([
                ("location_id", "child_of", options["locations"]),
            ])

        return self.env["stock.move"].search(domain)

    def _get_stock_quants(self, products, options):
        domain = [
            ("location_id.usage", "=", "internal"),
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append([
                ("location_id", "child_of", options["locations"]),
            ])

        return self.env["stock.quant"].search(domain)

    def _make_product_category_rows(self, stock_data, options):
        rows = {}
        all_categories = self._get_all_categories(options)

        def get_matching_row(category, uom):
            index = (category.id, uom.id)
            row = rows.get(index)
            if not row:
                rows[index] = self._make_empty_category_row(category, uom)
            return row

        for category in all_categories:
            for product in self._get_products_from_category(category, stock_data):
                row = get_matching_row(category, product.uom_id)
                product_data = stock_data.get(product)
                row["currentStock"] += product_data["currentStock"]
                row["reserved"] += product_data["reserved"]
                row["incoming"].extend(product_data["incoming"])
                row["outgoing"].extend(product_data["outgoing"])

        return rows

    def _get_products_from_category(self, category, stock_data):
        all_product_ids = [p.id for p in stock_data.keys()]
        return self.env["product.product"].search(
            [
                ("id", "in", all_product_ids),
                ("categ_id", "child_of", category.id),
            ]
        )

    def _make_empty_category_row(self, category, uom):
        return {
            "label": self._get_category_row_label(category, uom),
            "categoryId": category.id,
            "uomId": uom.id,
            "currentStock": 0,
            "reserved": 0,
            "incoming": [],
            "outgoing": [],
        }

    def _get_category_row_label(self, category, uom):
        units = self.env.ref("product.product_uom_unit")
        if uom == units:
            return category.display_name
        else:
            return "{category} ({uom})".format(
                category=category.display_name,
                uom=uom.display_name,
            )

    def _get_all_categories(self, options):
        category_ids = options.get("categories") or []
        return self.env["product.category"].search([
            ("id", "child_of", category_ids),
        ])
