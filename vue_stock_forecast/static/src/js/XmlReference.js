odoo.define("vue_stock_forecast.XmlReference", function(require){

var Class = require("web.Class");
var QueryBuilder = require("vue_stock_forecast.QueryBuilder");

var XmlReference = Class.extend({
    init(module_, name){
        this._module = module_;
        this._name = name;
        this._id = null;
        this._model = null;
        this._fetched = false;
    },
    async getId(){
        if(!this._fetched){
            await this._fetchData();
        }
        return this._id;
    },
    async _fetchData(){
        var query = (
            new QueryBuilder("ir.model.data", ["res_id", "model"])
            .filter([["module", "=", this._module], ["name", "=", this._name]])
            .searchRead()
        )
        var result = (await query);

        if(result.length){
            this._id = result[0].res_id;
            this._model = result[0].model;
        }
        this._fetched = true;
    },
});

return XmlReference;

});
