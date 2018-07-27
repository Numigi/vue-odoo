odoo.define('vue_stock_forecast.StockForecastReport', function (require) {
"use strict";

var core = require('web.core');
var Widget = require('web.Widget');
var StockForecastTable = window.vueStockForecast.StockForecastTable;

var StockForecastReport = Widget.extend({
    start(){
        this.$el;
        return this._super.apply(this, arguments);
    },

});

core.action_registry.add('stock_forecast_report', StockForecastReport);

return StockForecastReport;

});
