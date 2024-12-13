# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models
from .common import matches_supplier


class Product(models.Model):

    _inherit = "product.product"

    def has_preferred_supplier(self, supplier):
        if self.product_tmpl_id.has_preferred_supplier(supplier):
            return True

        sellers = self.seller_ids.filtered(
            lambda s: s.product_id == self
        )
        if not sellers:
            return False

        return matches_supplier(sellers[0], supplier)
