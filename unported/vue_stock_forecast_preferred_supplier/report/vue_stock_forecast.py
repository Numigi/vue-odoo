# © 2020 - today Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models


class VueStockForecast(models.AbstractModel):

    _inherit = "vue.stock.forecast"

    def _get_supplier_products(self, supplier_ids):
        products = super()._get_supplier_products(supplier_ids)
        suppliers = self.env["res.partner"].browse(supplier_ids)
        return products.filtered(
            lambda p: any(p.has_preferred_supplier(s) for s in suppliers)
        )
