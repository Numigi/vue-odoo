odoo.define("vue_stock_forecast.StockForecastReport", function (require) {
"use strict";

var QueryBuilder = require("vue.QueryBuilder");
var ControlPanelMixin = require("web.ControlPanelMixin");
var core = require("web.core");
var Widget = require("web.Widget");
var data = require("web.data");

var ReportComponent = Vue.extend(vueStockForecast.StockForecastReport);

var _t = core._t;

var StockForecastReport = Widget.extend(ControlPanelMixin, {
    async start(){
        await this._super();

        this.$vm = new ReportComponent({
            propsData: {
                // Filters
                searchProducts: (query) => this.searchProducts(query),
                searchProductCategories: (query) => this.searchProductCategories(query),
                searchStockLocations: (query) => this.searchStockLocations(query),
                searchSuppliers: (query) => this.searchSuppliers(query),

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

        this.setDefaultProduct();
        this.setDefaultProductTemplate();
        this.updateBreadrumb();
    },
    /**
     * Handle passing a default product id through the context.
     */
    async setDefaultProduct(){
        var context = this.getContext();
        if(context.product_id){
            var query = new QueryBuilder("product.product", ["display_name"]);
            query.filter([["id", "=", context.product_id]]);
            var products = (await query.searchRead()).map((p) => [p.id, p.display_name]);
            this.$vm.setProducts(products);
            this.onFilterChange();
        }
    },
    /**
     * Handle passing a default product template id through the context.
     */
    async setDefaultProductTemplate(){
        var context = this.getContext();
        if(context.product_template_id){
            var query = new QueryBuilder("product.product", ["display_name"]);
            query.filter([["product_tmpl_id", "=", context.product_template_id]]);
            var products = (await query.searchRead()).map((p) => [p.id, p.display_name]);
            this.$vm.setProducts(products);
            this.onFilterChange();
        }
    },
    getContext(){
        var parent = this.getParent();
        var parentIsAction = parent.get_inner_action;
        return parentIsAction ? parent.get_inner_action().action_descr.context : {};
    },
    /**
     * Search products by name.
     *
     * @param {String} query - the expression to search.
     * @returns {Array[Object]} - the product records found.
     */
    searchProducts(query){
        return this._nameSearchQuery("product.product", query, []);
    },
    /**
     * Search product categories by name.
     *
     * @param {String} query - the expression to search.
     * @returns {Array[Object]} - the product category records found.
     */
    searchProductCategories(query){
        return this._nameSearchQuery("product.category", query, []);
    },
    /**
     * Search stock locations by name.
     *
     * @param {String} query - the expression to search.
     * @returns {Array[Object]} - the stock location records found.
     */
    searchStockLocations(query){
        return this._nameSearchQuery("stock.location", query, [["usage", "=", "internal"]]);
    },
    /**
     * Search stock suppliers by name.
     *
     * @param {String} query - the expression to search.
     * @returns {Array[Object]} - the res.partner records found.
     */
    searchSuppliers(query){
        return this._nameSearchQuery("res.partner", query, [["supplier", "=", true]]);
    },
    _nameSearchQuery(model, query, domain, limit){
        return this._rpc({
            model,
            method: "name_search",
            params: { context: odoo.session_info.user_context },
            kwargs: {
                name: query,
                args: domain,
                limit: limit || 80,
            },
        });
    },
    async onFilterChange(products){
        var rows = await this._fetchRowsData();
        this.$vm.rows = rows.sort((r1, r2) => r1.label > r2.label);
    },
    _fetchRowsData() {
        const options = {
            products: this.$vm.products.map(r => r.id),
            categories: this.$vm.productCategories.map(r => r.id),
            locations: this.$vm.locations.map(r => r.id),
            suppliers: this.$vm.suppliers.map(r => r.id),
            groupBy: this.$vm.rowGroupBy,
        }
        return this._rpc({
            model: "vue.stock.forecast",
            method: "fetch",
            params: { context: odoo.session_info.user_context },
            kwargs: { options },
        })
    },
    /**
     * Handle the click on a stock quant amount (the column `Stock`).
     *
     * An action is triggered to redirect the user to the list of stock quants that
     * compose the amount clicked.
     *
     * @param {Object} row - the data of the row on which the user clicked.
     */
    onCurrentStockClicked(row){
        var domain = [["location_id.usage", "=", "internal"]];

        if(row.productId){
            domain.push(["product_id", "=", row.productId]);
        }
        if(row.categoryId) {
            domain.push(["product_id.categ_id", "child_of", row.categoryId]);
        }
        if(row.uomId){
            domain.push(["product_id.uom_id", "=", row.uomId]);
        }

        domain = domain.concat(this.getStockQuantLocationDomain());

        this.do_action({
            res_model: "stock.quant",
            name: _t("Current Stocks"),
            views: [[false, "list"], [false, "form"]],
            type: "ir.actions.act_window",
            domain,
        });
    },
    /**
     * Get the domain related to locations used for filtering stock quants.
     *
     * @returns {Array} the domain filter.
     */
    getStockQuantLocationDomain(){
        var domain = [];
        var locationIds = this.$vm.locations.map((l) => l.id);
        if(locationIds.length){
            domain.push(["location_id", "child_of", locationIds]);
        }
        return domain;
    },
    /**
     * Handle the click on a stock move amount.
     *
     * An action is triggered to redirect the user to the list of stock moves
     * that compose the amount clicked.
     *
     * The given dateFrom and dateTo represent the date interval of the amount clicked.
     *
     * @param {Object} row - the data of the row on which the user clicked.
     * @param {String} dateFrom - the min date
     * @param {String} dateTo - the max date
     */
    onMoveAmountClicked(row, dateFrom, dateTo){
        var dayAfterDateTo = moment(dateTo).add(1, "day").format("YYYY-MM-DD");
        var domain = [
            ["state", "not in", ["done", "cancel"]],
            ["date_expected", ">=", dateFrom],
            ["date_expected", "<", dayAfterDateTo],
        ];

        if(row.productId){
            domain.push(["product_id", "=", row.productId]);
        }
        if(row.categoryId) {
            domain.push(["product_id.categ_id", "child_of", row.categoryId]);
        }
        if(row.uomId){
            domain.push(["product_id.uom_id", "=", row.uomId]);
        }

        domain.concat(this.getStockMoveLocationDomain());

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
            domain,
        });
    },
    /**
     * Get the domain related to locations used for filtering stock moves.
     *
     * @returns {Array} the domain filter.
     */
    getStockMoveLocationDomain(){
        var domain = [];
        var locationIds = this.$vm.locations.map((l) => l.id);
        if(locationIds.length){
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
        return domain;
    },
    do_show(){
        this.$el.removeClass("o_hidden");
        this.$el[0].appendChild(this.$vm.$el);
    },
    destroy(){
        var parentNode = this.$vm.$el.parentNode;
        if(parentNode){
            parentNode.removeChild(this.$vm.$el);
        }
        this.$vm.$destroy();
        this._super.apply(this, arguments);
    },
    on_attach_callback(){
        this.updateBreadrumb();
    },
    updateBreadrumb(){
        var parent = this.getParent();
        var parentIsAction = Boolean(parent.get_breadcrumbs);
        if(parentIsAction){
            var controlPanelStatus = {breadcrumbs: parent.get_breadcrumbs()};
            this.update_control_panel(controlPanelStatus);
        }
    },
});

core.action_registry.add("stock_forecast_report", StockForecastReport);

return StockForecastReport;

});
