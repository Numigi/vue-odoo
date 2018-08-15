odoo.define("vue.QueryBuilder", function(require){

var rpc = require("web.rpc");
var Class = require("web.Class");

/**
 * Class used for searching object using the Odoo rpc api.
 *
 * Example:
 *
 * query = QueryBuilder('res.partner', ['zip', 'city', ...]);
 * query.filter([['customer', '=', true]]);
 * partners = await query.searchRead();
 */
var QueryBuilder = Class.extend({
    init(model, fields){
        this._model = model;
        this._fields = fields;
        this._domain = [];
    },
    /**
     * Filter the query given a domain filter.
     *
     * @param {Array} domain - the domain filter to add.
     * @returns {QueryBuilder} this for chaining.
     */
    filter(domain){
        this._domain = this._domain.concat(domain);
        return this;
    },
    /**
     * Search and read the records.
     *
     * @returns {Deferred} the query's deferred.
     */
    searchRead(){
        return rpc.query({
            model: this._model,
            method: "search_read",
            args: [this._domain, this._fields],
        });
    },
});

return QueryBuilder;

});
