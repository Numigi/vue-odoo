# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests.common import SavepointCase


class TestProductProduct(SavepointCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.product_a1 = cls.env["product.product"].create(
            {"name": "Product A1", "type": "product",}
        )
        cls.product_a2 = cls.env["product.product"].create(
            {
                "name": "Product A2",
                "type": "product",
                "product_tmpl_id": cls.product_a1.product_tmpl_id.id,
            }
        )
        cls.product_b = cls.env["product.product"].create(
            {"name": "Product A", "type": "product",}
        )

        cls.supplier_a = cls.env["res.partner"].create(
            {"name": "My Vendor A", "supplier": True, "is_company": True,}
        )

        cls.supplier_b = cls.env["res.partner"].create(
            {"name": "My Vendor B", "supplier": True, "is_company": True,}
        )

        cls.supplier_a_contact = cls.env["res.partner"].create(
            {
                "name": "My Vendor A - Contact",
                "supplier": True,
                "is_company": False,
                "parent_id": cls.supplier_a.id,
            }
        )

        cls.report = cls.env["vue.stock.forecast"]

    def test_no_supplier_price(self):
        assert not self.product_a1.has_preferred_supplier(self.supplier_a)

    def test_first_supplier_price(self):
        self._add_supplier(self.product_a1, self.supplier_a, 1)
        assert self.product_a1.has_preferred_supplier(self.supplier_a)
        assert not self.product_a2.has_preferred_supplier(self.supplier_a)

    def test_second_supplier_price(self):
        self._add_supplier(self.product_a1, self.supplier_a, 1)
        self._add_supplier(self.product_a1, self.supplier_b, 2)
        assert not self.product_a1.has_preferred_supplier(self.supplier_b)

    def test_child_supplier_as_preffered_supplier(self):
        self._add_supplier(self.product_a1, self.supplier_a_contact, 1)
        assert self.product_a1.has_preferred_supplier(self.supplier_a)

    def test_first_supplier_price_of_product_template(self):
        self._add_supplier_to_template(self.product_a1, self.supplier_a, 1)
        assert self.product_a1.has_preferred_supplier(self.supplier_a)
        assert self.product_a2.has_preferred_supplier(self.supplier_a)

    def test_report(self):
        self._add_supplier(self.product_a1, self.supplier_a, 1)
        self._add_supplier(self.product_b, self.supplier_b, 1)
        self._add_supplier(self.product_b, self.supplier_a, 2)
        products = self.env["vue.stock.forecast"]._get_supplier_products(
            [self.supplier_a.id],
        )
        assert products == self.product_a1

    def _add_supplier(self, product, partner, sequence):
        product.write(
            {
                "seller_ids": [
                    (
                        0,
                        0,
                        {
                            "name": partner.id,
                            "sequence": sequence,
                            "product_id": product.id,
                            "product_tmpl_id": product.product_tmpl_id.id,
                        },
                    )
                ]
            }
        )

    def _add_supplier_to_template(self, product, partner, sequence):
        product.product_tmpl_id.write(
            {
                "seller_ids": [
                    (
                        0,
                        0,
                        {
                            "name": partner.id,
                            "sequence": sequence,
                        },
                    )
                ]
            }
        )
