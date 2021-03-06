odoo.define("vue_stock_forecast.StockForecastReport", function (require) {
"use strict";

var QueryBuilder = require("vue.QueryBuilder");
var ControlPanelMixin = require("web.ControlPanelMixin");
var core = require("web.core");
var AbstractAction = require("web.AbstractAction");
var data = require("web.data");

var ReportComponent = Vue.extend(vueStockForecast.StockForecastReport);

var nextRowKey = 1

var _t = core._t;

var StockForecastReport = AbstractAction.extend(ControlPanelMixin, {
    init: function (parent, action) {
        this._super.apply(this, arguments);
        this.context = action.context || {};
    },

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
        this.$vm.$on("min-max-clicked", (row) => this.onMinMaxClicked(row));
        this.$vm.$on("purchased-clicked", (row) => this.onPurchasedClicked(row));
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
        const productIds = await this._getProductIdsFromContext()
        if(productIds.length){
            var query = new QueryBuilder("product.product", ["display_name"]);
            query.filter([["id", "in", productIds]]);
            var products = (await query.searchRead()).map((p) => [p.id, p.display_name]);
            this.$vm.setProducts(products);
            this.onFilterChange();
        }
    },
    async _getProductIdsFromContext() {
        const context = this.context
        if (context.product_id) {
            return [context.product_id]
        }
        else if (context.purchase_order_id) {
            return await this._getProductIdsFromPurchaseOrder(context.purchase_order_id)
        }
        return []
    },
    async _getProductIdsFromPurchaseOrder(order_id) {
        const query = new QueryBuilder("purchase.order.line", ["product_id"]);
        query.filter([
            ["order_id", "=", order_id],
            ["product_id.type", "in", ["consu", "product"]],
        ])
        const result = await query.searchRead()
        return result.map((p) => p.product_id[0]);
    },
    /**
     * Handle passing a default product template id through the context.
     */
    async setDefaultProductTemplate(){
        if(this.context.product_template_id){
            var query = new QueryBuilder("product.product", ["display_name"]);
            query.filter([["product_tmpl_id", "=", this.context.product_template_id]]);
            var products = (await query.searchRead()).map((p) => [p.id, p.display_name]);
            this.$vm.setProducts(products);
            this.onFilterChange();
        }
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
        rows = rows.map(row => {
            return {
                key: nextRowKey++,
                ...row
            }
        });
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
    onMinMaxClicked(row) {
        this.do_action({
            res_model: "stock.warehouse.orderpoint",
            name: _t("{}: Min / Max").replace("{}", row.label),
            views: [[false, "list"], [false, "form"]],
            type: "ir.actions.act_window",
            domain: this.getOrderpointDomain(row),
            context: this.getOrderpointContext(row),
        });
    },
    getOrderpointDomain(row) {
        var domain = [];

        if(row.productId){
            domain.push(["product_id", "=", row.productId]);
        }

        if(row.categoryId) {
            domain.push(["product_id.categ_id", "child_of", row.categoryId]);
        }

        if(row.uomId){
            domain.push(["product_id.uom_id", "=", row.uomId]);
        }

        return domain
    },
    getOrderpointContext(row) {
        const context = this.getUserContext()

        if(row.productId){
            context.default_product_id = row.productId
        }

        return context
    },
    onPurchasedClicked(row) {
        this.do_action({
            res_model: "purchase.order.line",
            name: _t("{}: Quotation").replace("{}", row.label),
            views: [[false, "list"], [false, "form"]],
            type: "ir.actions.act_window",
            domain: this.getPurchaseOrderLineDomain(row),
            context: this.getPurchaseOrderLineContext(row),
        });
    },
    getPurchaseOrderLineDomain(row) {
        var domain = [
            ["order_id.state", "in", ["draft", "sent", "to approve"]],
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

        return domain
    },
    getPurchaseOrderLineContext(row) {
        const context = this.getUserContext()

        if(row.productId){
            context.default_product_id = row.productId
        }

        return context
    },
    getStockQuantLocationDomain(){
        var domain = [];
        var locationIds = this.$vm.locations.map((l) => l.id);
        if(locationIds.length){
            domain.push(["location_id", "child_of", locationIds]);
        }
        return domain;
    },
    onMoveAmountClicked(row, dateFrom, dateTo){
        var dayAfterDateTo = moment(dateTo).add(1, "day").format("YYYY-MM-DD");
        var domain = [
            ["state", "not in", ["done", "cancel"]],
            ["date_expected", ">=", this.toUTC(dateFrom)],
            ["date_expected", "<", this.toUTC(dayAfterDateTo)],
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
    toUTC(date) {
        return moment(date).utc().format("YYYY-MM-DD HH:mm:ss")
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
            domain.push("&");
            domain.push(["location_id.usage", "!=", "internal"]);
            domain.push(["location_dest_id.usage", "=", "internal"]);
            domain.push("&");
            domain.push(["location_id.usage", "=", "internal"]);
            domain.push(["location_dest_id.usage", "!=", "internal"]);
        }
        return domain;
    },
    getUserContext() {
        return {...odoo.session_info.user_context}
    },
    do_action() {
        const res = this._super.apply(this, arguments);
        res.then(() => this.do_hide())
        return res
    },
    do_show(){
        this.$el.removeClass("o_hidden");
        this.$vm.visible = true
    },
    do_hide(){
        this.$el.addClass("o_hidden");
        this.$vm.visible = false
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

/**
/ Force add terms to the generated .pot file
/
/ Note that terms end with a trailing space
/ This ensures that the terms don't collide with existing non-javascript (python) transactions.
/ Odoo skips new javascript translations if the same python translation exists.
*/
_t("Available ");
_t("Columns ");
_t("Day ");
_t("End Date ");
_t("Location ");
_t("Min / Max ");
_t("Month ");
_t("Product ");
_t("Product Categories ");
_t("Product Category ");
_t("Products ");
_t("Quotation ");
_t("Reserved ");
_t("Rows ");
_t("Search ");
_t("Start Date ");
_t("Stock ");
_t("Supplier ");
_t("Week ");

return StockForecastReport;

});
