odoo.define("vue_stock_forecast.StockForecastReport", function (require) {
"use strict";

var core = require("web.core");
var Widget = require("web.Widget");
var data = require("web.data");

var fetchStockData = require("vue_stock_forecast.fetchStockData");
var fetchProducts = require("vue_stock_forecast.fetchProducts");
var fetchProductCategories = require("vue_stock_forecast.fetchProductCategories");
var ReportComponent = Vue.extend(vueStockForecast.StockForecastReport);

var _t = core._t;

var StockForecastReport = Widget.extend({
    start(){
        this.$vm = new ReportComponent({
            propsData: {
                // Filters
                searchProducts: (query) => this.searchProducts(query),
                searchProductCategories: (query) => this.searchProductCategories(query),
                searchStockLocations: (query) => this.searchStockLocations(query),

                // Function called when a filter changed
                onFilterChange: () => this.onFilterChange(),

                translate: _t,
            }
        }).$mount(this.$el[0]);

        this.$vm.$on("current-stock-clicked", (row) => this.onCurrentStockClicked(row));

        this.$vm.$on(
            "move-amount-clicked",
            (row, dateFrom, dateTo) => this.onMoveAmountClicked(row, dateFrom, dateTo)
        );

        this.onFilterChange();
        return this._super.apply(this, arguments);
    },
    searchProducts(query){
        return this._nameSearchQuery("product.product", query, []);
    },
    searchProductCategories(query){
        return this._nameSearchQuery("product.category", query, []);
    },
    searchStockLocations(query){
        return this._nameSearchQuery("stock.location", query, [["usage", "=", "internal"]]);
    },
    _nameSearchQuery(model, query, domain, limit){
        return this._rpc({
            model: model,
            method: "name_search",
            kwargs: {
                name: query,
                args: domain,
                limit: limit || 80,
            },
        });
    },
    async onFilterChange(products){
        if(!this.$vm.products.length && !this.$vm.productCategories.length){
            this.$vm.rows = [];
            return;
        }

        var rows = await fetchStockData(
            this.$vm.products, this.$vm.productCategories, this.$vm.locations, this.$vm.rowGroupBy);
        this.$vm.rows = rows.sort((r1, r2) => r1.label > r2.label);
    },
    onCurrentStockClicked(row){
        var domain = [["location_id.usage", "=", "internal"]];

        if(row.product){
            domain.push(["product_id", "=", row.product.id]);
        }
        if(row.category) {
            domain.push(["product_id.categ_id", "child_of", row.category.id]);
        }
        if(row.uom){
            domain.push(["product_id.uom_id", "=", row.uom[0]]);
        }

        if(this.$vm.locations.length){
            domain.push(["location_id", "child_of", this.$vm.locations.map(l => l.id)]);
        }
        this.do_action({
            res_model: "stock.quant",
            name: _t("Current Stocks"),
            views: [[false, "list"], [false, "form"]],
            type: "ir.actions.act_window",
            domain: domain,
        });
    },
    onMoveAmountClicked(row, dateFrom, dateTo){
        var dayAfterDateTo = moment(dateTo).add(1, "day").format("YYYY-MM-DD");
        var domain = [
            ["state", "not in", ["done", "cancel"]],
            "|",
            ["date_expected", ">=", dateFrom],
            ["date_expected", "<", dayAfterDateTo],
        ];

        if(row.product){
            domain.push(["product_id", "=", row.product.id]);
        }
        if(row.category) {
            domain.push(["product_id.categ_id", "child_of", row.category.id]);
        }
        if(row.uom){
            domain.push(["product_id.uom_id", "=", row.uom[0]]);
        }

        if(this.$vm.locations.length){
            var locationIds = this.$vm.locations.map((l) => l.id);
            domain.push("|");
            domain.push("&");
            domain.push(["location_id", "child_of", locationIds]);
            domain.push(["location_id.usage", "=", "internal"]);
            domain.push("&");
            domain.push(["location_dest_id", "child_of", locationIds]);
            domain.push(["location_dest_id.usage", "=", "internal"]);
        }
        else{
            domain.push("|");
            domain.push(["location_id.usage", "=", "internal"]);
            domain.push(["location_dest_id.usage", "=", "internal"]);
        }

        var actionName = (
            _t("Stock Moves ({date_from} to {date_to})")
            .replace("{date_from}", dateFrom)
            .replace("{date_to}", dateTo)
        );

        this.do_action({
            res_model: "stock.move",
            name: actionName,
            views: [[false, "list"], [false, "form"]],
            type: "ir.actions.act_window",
            domain: domain,
        });
    },
    do_show(){
        this.$el.removeClass('o_hidden');
        this.$el[0].appendChild(this.$vm.$el);
    },
    destroy(){
        this._super.apply(this, arguments);
        this.$vm.$destroy();
    },
});

core.action_registry.add("stock_forecast_report", StockForecastReport);

return StockForecastReport;

});
