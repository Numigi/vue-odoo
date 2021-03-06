# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from ddt import ddt, data
from datetime import datetime
from odoo.tests.common import SavepointCase


class ForecastReportCase(SavepointCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.category = cls.env["product.category"].create(
            {
                "name": "All Products",
            }
        )

        cls.product_a = cls.env["product.product"].create(
            {
                "name": "Product A",
                "type": "product",
                "categ_id": cls.category.id,
            }
        )
        cls.product_b = cls.product_a.copy(
            {"name": "Product B", "type": "product", "categ_id": cls.category.id}
        )

        cls.supplier = cls.env["res.partner"].create(
            {
                "name": "My Vendor",
                "supplier": True,
                "is_company": True,
            }
        )

        cls.warehouse = cls.env.ref("stock.warehouse0")

        cls.parent_location = cls.warehouse.lot_stock_id

        cls.supplier_location = cls.env.ref("stock.stock_location_suppliers")
        cls.customer_location = cls.env.ref("stock.stock_location_customers")

        cls.location_1 = cls.env["stock.location"].create(
            {
                "name": "Location 1",
                "usage": "internal",
                "location_id": cls.parent_location.id,
            }
        )
        cls.location_2 = cls.env["stock.location"].create(
            {
                "name": "Location 2",
                "usage": "internal",
                "location_id": cls.parent_location.id,
            }
        )

        cls.report = cls.env["vue.stock.forecast"]


class TestStockForecastReport(ForecastReportCase):
    def test_search_by_product_ids(self):
        result = self.report.fetch({"products": [self.product_a.id]})
        assert len(result) == 1
        assert result[0]["productId"] == self.product_a.id

    def test_filter_by_location_id(self):
        location = self.env["stock.location"].search([], limit=1)
        self.report.fetch({"locations": [location.id]})

    def test_search_by_category_ids(self):
        category = self.env["product.category"].create({"name": "My Category"})
        self.product_b.categ_id = category.id
        result = self.report.fetch({"categories": [category.id]})
        assert len(result) == 1
        assert result[0]["productId"] == self.product_b.id

    def test_group_by_category_ids(self):
        result = self.report.fetch(
            {"categories": [self.category.id], "groupBy": "category"}
        )
        result = sorted(result, key=lambda r: r["categoryId"])
        assert result[0]["categoryId"] == self.category.id

    def test_supplier_with_no_product(self):
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 0

    def test_supplier_with_one_product(self):
        self._add_supplier_to_product_template(self.supplier, self.product_b)
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 1
        assert result[0]["productId"] == self.product_b.id

    def test_supplier_with_one_product_variant(self):
        product_c = self.product_b.copy(
            {"product_tmpl_id": self.product_b.product_tmpl_id.id}
        )
        self._add_supplier_to_product_variant(self.supplier, product_c)
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 1
        assert result[0]["productId"] == product_c.id

    def test_child_supplier_with_one_product(self):
        child = self.env["res.partner"].create(
            {
                "name": "Child A",
                "parent_id": self.supplier.id,
            }
        )
        self._add_supplier_to_product_template(child, self.product_b)
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 1
        assert result[0]["productId"] == self.product_b.id

    def _add_supplier_to_product_template(self, supplier, product):
        self.env["product.supplierinfo"].create(
            {
                "name": supplier.id,
                "product_tmpl_id": product.product_tmpl_id.id,
            }
        )

    def _add_supplier_to_product_variant(self, supplier, product):
        self.env["product.supplierinfo"].create(
            {
                "name": supplier.id,
                "product_tmpl_id": product.product_tmpl_id.id,
                "product_id": product.id,
            }
        )

    def test_min_max(self):
        min_ = 10
        max_ = 15
        self._setup_min_max(self.product_a, min_, max_)
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["min"] == min_
        assert result[0]["max"] == max_

    def test_min_max__with_category(self):
        min_ = 10
        max_ = 15
        self._setup_min_max(self.product_a, min_, max_)
        self._setup_min_max(self.product_b, min_, max_)
        result = self.report.fetch(
            {"categories": [self.category.id], "groupBy": "category"}
        )
        assert result[0]["min"] == min_ * 2
        assert result[0]["max"] == max_ * 2

    def test_min_max__with_category__in_multiple_uom(self):
        self.product_b.uom_id = self.env.ref("uom.product_uom_dozen")
        min_1 = 11
        max_1 = 12
        min_2 = 21
        max_2 = 22
        self._setup_min_max(self.product_a, min_1, max_1)
        self._setup_min_max(self.product_b, min_2, max_2)
        result = self.report.fetch(
            {"categories": [self.category.id], "groupBy": "category"}
        )
        assert result[0]["min"] == min_1
        assert result[0]["max"] == max_1
        assert result[1]["min"] == min_2
        assert result[1]["max"] == max_2

    def test_min_max__location_filter(self):
        min_ = 10
        max_ = 15
        self._setup_min_max(self.product_a, min_, max_, self.location_1)
        self._setup_min_max(self.product_a, 999, 999, self.location_2)
        result = self.report.fetch(
            {"products": [self.product_a.id], "locations": [self.location_1.id]}
        )
        assert result[0]["min"] == min_
        assert result[0]["max"] == max_

    def _setup_min_max(self, product, min_, max_, location=None):
        product.write(
            {
                "orderpoint_ids": [
                    (
                        0,
                        0,
                        {
                            "name": "/",
                            "warehouse_id": self.warehouse.id,
                            "location_id": (location or self.parent_location).id,
                            "product_min_qty": min_,
                            "product_max_qty": max_,
                            "qty_multiple": 1,
                            "company_id": self.warehouse.company_id.id,
                        },
                    )
                ]
            }
        )


@ddt
class TestStockMove(ForecastReportCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.date_expected = datetime(2020, 1, 15)
        cls.move = cls.env["stock.move"].create(
            {
                "location_id": cls.supplier_location.id,
                "location_dest_id": cls.location_1.id,
                "name": cls.product_a.display_name,
                "product_id": cls.product_a.id,
                "product_uom": cls.product_a.uom_id.id,
                "product_uom_qty": 1,
                "date_expected": cls.date_expected,
            }
        )
        cls.move._action_confirm()

    def test_incoming(self):
        result = self.report.fetch({"products": [self.product_a.id]})
        incoming = result[0]["incoming"]
        assert len(incoming) == 1
        assert incoming[0]["qty"] == 1
        assert incoming[0]["date"] == "2020-01-15"
        assert not result[0]["outgoing"]

    def test_incoming__location_not_matching(self):
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_2.id]})
        assert not result[0]["incoming"]

    def test_incoming__location_matching(self):
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_1.id]})
        incoming = result[0]["incoming"]
        assert len(incoming) == 1

    def test_incoming__with_category(self):
        result = self.report.fetch({"categories": [self.category.id], "groupBy": "category"})
        incoming = result[0]["incoming"]
        assert len(incoming) == 1

    @data("done", "cancel")
    def test_incoming__state_excluded(self, state):
        self.move.state = state
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_1.id]})
        assert not result[0]["incoming"]

    def test_outgoing(self):
        self.move.location_id = self.location_1
        self.move.location_dest_id = self.customer_location
        result = self.report.fetch({"products": [self.product_a.id]})
        outgoing = result[0]["outgoing"]
        assert len(outgoing) == 1
        assert outgoing[0]["qty"] == 1
        assert not result[0]["incoming"]

    def test_outgoing__location_not_matching(self):
        self.move.location_id = self.location_1
        self.move.location_dest_id = self.customer_location
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_2.id]})
        assert not result[0]["outgoing"]

    def test_outgoing__location_matching(self):
        self.move.location_id = self.location_1
        self.move.location_dest_id = self.customer_location
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_1.id]})
        outgoing = result[0]["outgoing"]
        assert len(outgoing) == 1

    def test_outgoing__with_category(self):
        self.move.location_id = self.location_1
        self.move.location_dest_id = self.customer_location
        result = self.report.fetch({"categories": [self.category.id], "groupBy": "category"})
        outgoing = result[0]["outgoing"]
        assert len(outgoing) == 1

    @data("done", "cancel")
    def test_outgoing__state_excluded(self, state):
        self.move.location_id = self.location_1
        self.move.location_dest_id = self.customer_location
        self.move.state = state
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_1.id]})
        assert not result[0]["outgoing"]

    def test_date_in_specific_timezone(self):
        result = self.report.with_context(tz="EST").fetch({"products": [self.product_a.id]})
        incoming = result[0]["incoming"]
        assert incoming[0]["date"] == "2020-01-14"


class TestStockQuant(ForecastReportCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.quant = cls.env["stock.quant"].create(
            {
                "location_id": cls.location_1.id,
                "product_id": cls.product_a.id,
                "quantity": 1,
            }
        )

    def test_basic_case(self):
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["currentStock"] == 1

    def test_location_not_matching(self):
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_2.id]})
        assert result[0]["currentStock"] == 0

    def test_location_matching(self):
        result = self.report.fetch({"products": [self.product_a.id], "locations": [self.location_1.id]})
        assert result[0]["currentStock"] == 1

    def test_group_by_category(self):
        result = self.report.fetch({"categories": [self.category.id], "groupBy": "category"})
        assert result[0]["currentStock"] == 1

    def test_no_reserved_quantity(self):
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["reserved"] == 0

    def test_reserved_quantity(self):
        self.quant.reserved_quantity = 1
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["reserved"] == 1


class TestPurchasedQuantity(ForecastReportCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.purchased_qty_a = 12
        cls.purchased_qty_b = 24
        cls.order = cls.env["purchase.order"].create(
            {
                "partner_id": cls.supplier.id,
                "order_line": [
                    (
                        0,
                        0,
                        {
                            "product_id": cls.product_a.id,
                            "product_uom": cls.product_a.uom_po_id.id,
                            "name": cls.product_a.name,
                            "product_qty": cls.purchased_qty_a,
                            "price_unit": 100,
                            "date_planned": datetime.now(),
                        },
                    ),
                    (
                        0,
                        0,
                        {
                            "product_id": cls.product_b.id,
                            "product_uom": cls.product_b.uom_po_id.id,
                            "name": cls.product_b.name,
                            "product_qty": cls.purchased_qty_b,
                            "price_unit": 100,
                            "date_planned": datetime.now(),
                        },
                    ),
                ],
            }
        )

    def test_purchased_quantity(self):
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["purchased"] == self.purchased_qty_a

    def test_purchase_in_different_uom(self):
        self.product_a.uom_id = self.env.ref("uom.product_uom_dozen")
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["purchased"] == self.purchased_qty_a / 12

    def test_purchased_quantity__with_categories(self):
        result = self.report.fetch({"categories": [self.category.id], "groupBy": "category"})
        assert (
            result[0]["purchased"]
            == self.purchased_qty_a + self.purchased_qty_b
        )

    def test_confirmed_order_excluded(self):
        self.order.button_confirm()
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["purchased"] == 0

    def test_confirmed_order_sent(self):
        self.order.state = "sent"
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["purchased"] == self.purchased_qty_a

    def test_confirmed_order_to_approve(self):
        self.order.state = "to approve"
        result = self.report.fetch({"products": [self.product_a.id]})
        assert result[0]["purchased"] == self.purchased_qty_a
