# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests.common import SavepointCase


class TestResPartner(SavepointCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.product_a = cls.env["product.product"].create(
            {
                "name": "Product A",
                "type": "product",
            }
        )
        cls.product_b = cls.product_a.copy({"name": "Product B"})

        cls.supplier = cls.env["res.partner"].create(
            {
                "name": "My Vendor",
                "supplier": True,
                "is_company": True,
            }
        )

        cls.report = cls.env["vue.stock.forecast"]

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
        category = self.env.ref("product.product_category_all")
        result = self.report.fetch({"categories": [category.id], "groupBy": "category"})
        result = sorted(result, key=lambda r: r["categoryId"])
        assert result[0]["categoryId"] == category.id

    def test_supplier_with_no_product(self):
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 0

    def test_supplier_with_one_product(self):
        self._add_supplier_to_product_template(self.supplier, self.product_b)
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 1
        assert result[0]["productId"] == self.product_b.id

    def test_supplier_with_one_product_variant(self):
        product_c = self.product_b.copy({"product_tmpl_id": self.product_b.product_tmpl_id.id})
        self._add_supplier_to_product_variant(self.supplier, product_c)
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 1
        assert result[0]["productId"] == product_c.id

    def test_child_supplier_with_one_product(self):
        child = self.env["res.partner"].create({
            "name": "Child A",
            "parent_id": self.supplier.id,
        })
        self._add_supplier_to_product_template(child, self.product_b)
        result = self.report.fetch({"suppliers": [self.supplier.id]})
        assert len(result) == 1
        assert result[0]["productId"] == self.product_b.id

    def _add_supplier_to_product_template(self, supplier, product):
        self.env["product.supplierinfo"].create({
            "name": supplier.id,
            "product_tmpl_id": product.product_tmpl_id.id,
        })

    def _add_supplier_to_product_variant(self, supplier, product):
        self.env["product.supplierinfo"].create({
            "name": supplier.id,
            "product_tmpl_id": product.product_tmpl_id.id,
            "product_id": product.id,
        })
