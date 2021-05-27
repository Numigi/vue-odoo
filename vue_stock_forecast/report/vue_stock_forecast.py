# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

import pytz
from datetime import datetime
from odoo import api, models
from odoo.tools import DEFAULT_SERVER_DATE_FORMAT
from odoo.osv.expression import OR


class VueStockForecast(models.AbstractModel):

    _name = "vue.stock.forecast"
    _description = "Vue Stock Forecast"

    @api.model
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
        data = self._get_data(products, options)
        return {p: self._make_row_data(p, data) for p in products}

    def _get_data(self, products, options):
        return {
            "incoming_moves": self._get_incoming_stock_moves(products, options),
            "outgoing_moves": self._get_outgoing_stock_moves(products, options),
            "quants": self._get_stock_quants(products, options),
            "orderpoints": self._get_orderpoints(products, options),
            "purchase_lines": self._get_purchase_lines(products, options),
        }

    def _make_row_data(self, product, data):
        in_moves = data["incoming_moves"].filtered(lambda m: m.product_id == product)
        out_moves = data["outgoing_moves"].filtered(lambda m: m.product_id == product)
        quants = data["quants"].filtered(lambda q: q.product_id == product)
        orderpoints = data["orderpoints"].filtered(lambda o: o.product_id == product)
        return {
            "label": product.display_name,
            "productId": product.id,
            "uom": product.uom_id,
            "currentStock": sum(q.quantity for q in quants),
            "reserved": sum(q.reserved_quantity for q in quants),
            "incoming": [self._format_stock_move(m) for m in in_moves],
            "outgoing": [self._format_stock_move(m) for m in out_moves],
            "min": sum(orderpoints.mapped("product_min_qty")),
            "max": sum(orderpoints.mapped("product_max_qty")),
            "purchased": self._get_product_purchased_quantity(product, data),
        }

    def _get_product_purchased_quantity(self, product, data):
        purchase_lines = data["purchase_lines"].filtered(lambda o: o.product_id == product)
        return sum(
            l.product_uom._compute_quantity(l.product_qty, product.uom_id) for l in purchase_lines
        )

    def _format_stock_move(self, move):
        return {"qty": move.product_qty, "date": self._format_date(move.date_expected)}

    def _format_date(self, naive_datetime):
        utc_datetime = pytz.utc.localize(naive_datetime)
        tz = self._context.get("tz") or "UCT"
        tz_datetime = utc_datetime.astimezone(pytz.timezone(tz))
        return datetime.strftime(tz_datetime, DEFAULT_SERVER_DATE_FORMAT)

    def _get_products(self, options):
        product_ids = options.get("products") or []
        category_ids = options.get("categories") or []
        supplier_ids = options.get("suppliers") or []

        if not product_ids and not category_ids and not supplier_ids:
            return self.env["product.product"]

        domain = []

        if product_ids:
            domain = OR([domain, [("id", "in", product_ids)]])

        if category_ids:
            domain = OR([domain, [("categ_id", "child_of", category_ids)]])

        if supplier_ids:
            supplier_domain = self._get_supplier_domain(supplier_ids)
            domain = OR([domain, supplier_domain])

        products = self.env["product.product"].search(domain)
        return products.filtered(lambda p: p.type in ("product", "consu"))

    def _get_supplier_domain(self, supplier_ids):
        products = self._get_supplier_products(supplier_ids)
        return [("id", "in", products.ids)]

    def _get_supplier_products(self, supplier_ids):
        supplier_info = self.env["product.supplierinfo"].search(
            [
                ("name.commercial_partner_id", "in", supplier_ids),
            ]
        )
        products = self.env["product.product"]

        for info in supplier_info:
            if info.product_id:
                products |= info.product_id
            else:
                products |= info.product_tmpl_id.product_variant_ids

        return products

    def _get_incoming_stock_moves(self, products, options):
        domain = [
            ("state", "not in", ["done", "cancel"]),
            ("location_id.usage", "!=", "internal"),
            ("location_dest_id.usage", "=", "internal"),
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append(
                ("location_dest_id", "child_of", options["locations"]),
            )

        return self.env["stock.move"].search(domain)

    def _get_outgoing_stock_moves(self, products, options):
        domain = [
            ("state", "not in", ["done", "cancel"]),
            ("location_id.usage", "=", "internal"),
            ("location_dest_id.usage", "!=", "internal"),
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append(
                ("location_id", "child_of", options["locations"]),
            )

        return self.env["stock.move"].search(domain)

    def _get_stock_quants(self, products, options):
        domain = [
            ("location_id.usage", "=", "internal"),
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append(
                ("location_id", "child_of", options["locations"]),
            )

        return self.env["stock.quant"].search(domain)

    def _get_orderpoints(self, products, options):
        domain = [
            ("product_id", "in", products.ids),
        ]

        if options.get("locations"):
            domain.append(
                ("location_id", "child_of", options["locations"]),
            )

        return self.env["stock.warehouse.orderpoint"].search(domain)

    def _get_purchase_lines(self, products, options):
        domain = [
            ("product_id", "in", products.ids),
            ("state", "in", ("draft", "sent", "to approve")),
        ]
        return self.env["purchase.order.line"].search(domain)

    def _make_product_category_rows(self, stock_data, options):
        rows = {}
        all_categories = self._get_all_categories(options)

        def get_matching_row(category, uom):
            index = (category, uom)
            if index not in rows:
                rows[index] = self._make_empty_category_row(category, uom)
            return rows[index]

        for category in all_categories:
            for product in self._get_products_from_category(category, stock_data):
                row = get_matching_row(category, product.uom_id)
                product_data = stock_data[product]
                row["currentStock"] += product_data["currentStock"]
                row["reserved"] += product_data["reserved"]
                row["incoming"].extend(product_data["incoming"])
                row["outgoing"].extend(product_data["outgoing"])
                row["min"] += product_data["min"]
                row["max"] += product_data["max"]
                row["purchased"] += product_data["purchased"]

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
            "min": 0,
            "max": 0,
            "purchased": 0,
        }

    def _get_category_row_label(self, category, uom):
        units = self.env.ref("uom.product_uom_unit")
        if uom == units:
            return category.display_name
        else:
            return "{category} ({uom})".format(
                category=category.display_name,
                uom=uom.display_name,
            )

    def _get_all_categories(self, options):
        category_ids = options.get("categories") or []
        return self.env["product.category"].search(
            [
                ("id", "child_of", category_ids),
            ]
        )
