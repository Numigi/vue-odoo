odoo.define("vue.XmlReference", function(require){

var Class = require("web.Class");
var QueryBuilder = require("vue.QueryBuilder");

/**
 * A class responsible for resolving an xml reference.
 *
 * Example:
 *
 * route = XmlReference("stock", "route_warehouse0_mto")
 * routeId = await route.getId()
 */
var XmlReference = Class.extend({
    init(module_, name){
        this._module = module_;
        this._name = name;
        this._query = null;
    },
    /**
     * Get the id of the referenced object.
     *
     * @returns {Integer} the record id.
     */
    async getId(){
        if(!this._query){
            this._query = (
                new QueryBuilder("ir.model.data", ["res_id", "model"])
                .filter([["module", "=", this._module], ["name", "=", this._name]])
                .searchRead()
            );
        }
        return (await this._query)[0].res_id;
    },
});

return XmlReference;

});
