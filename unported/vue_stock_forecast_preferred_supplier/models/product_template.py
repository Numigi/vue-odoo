# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models
from .common import matches_supplier


class ProductTemplate(models.Model):

    _inherit = "product.template"

    def has_preferred_supplier(self, supplier):
        sellers = self.seller_ids.filtered(
            lambda s: not s.product_id
        )
        if not sellers:
            return False

        return matches_supplier(sellers[0], supplier)
