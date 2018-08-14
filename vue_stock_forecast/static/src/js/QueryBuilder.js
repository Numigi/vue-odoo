odoo.define("vue_stock_forecast.QueryBuilder", function(require){

var rpc = require("web.rpc");
var Class = require("web.Class");

var QueryBuilder = Class.extend({
    init(model, fields){
        this._model = model;
        this._fields = fields;
        this._domain = [];
    },
    filter(domain){
        this._domain = this._domain.concat(domain);
        return this;
    },
    readGroup(groupby){
        return rpc.query({
            model: this._model,
            method: "read_group",
            args: [this._domain, this._fields, groupby],
        });
    },
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
