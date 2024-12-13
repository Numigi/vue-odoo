# © 2018 Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl).

from odoo import api, models


class IrTranslation(models.Model):

    _inherit = 'ir.translation'

    @api.model
    def get_element_ui_translations(self, lang):
        """Get all translations for element ui components.

        The sudo is required so that website and portal users may
        access these translations.
        """
        translations = self.sudo().search([
            ('name', '=', 'addons/vue_element_ui/static/src/js/i18n.js'),
            ('lang', '=', lang),
        ])
        return [(t.source, t.value) for t in translations]
