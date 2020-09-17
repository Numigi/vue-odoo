# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo.tests.common import SavepointCase


class TestResPartner(SavepointCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.product = cls.env["product.product"].create(
            {
                "name": "Product A",
                "type": "product",
            }
        )

        cls.report = cls.env["vue.stock.forecast"]

    def test_search_by_product_ids(self):
        result = self.report.fetch({"products": [self.product.id]})
        assert len(result) == 1
        assert result[0]["product_id"] == self.product.id
