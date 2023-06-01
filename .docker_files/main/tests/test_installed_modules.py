
from odoo.tests import TransactionCase


class TestModules(TransactionCase):

    def setUp(self):
        super(TestModules, self).setUp()
        self.modules = self.env['ir.module.module']

    # TODO : maybe to uncomment after migrating the module vue_stock_forecast
    # def test_vue_stock_forcast(self):
    #     module = self.modules.search([('name', '=', 'vue_stock_forecast')])
    #     self.assertTrue(module.state == "installed")
