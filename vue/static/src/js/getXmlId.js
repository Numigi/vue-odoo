odoo.define("vue.getXmlId", function(require){

var Class = require("web.Class");
var QueryBuilder = require("vue.QueryBuilder");

/**
 * A class responsible for caching an xml reference.
 */
var XmlReference = Class.extend({
    init(ref){
        var parts = ref.split(".");
        if(parts.length === 2){
            this._module = parts[0];
            this._name = parts[1];
        }
        else{
            this._module = false;
            this._name = parts[0];
        }
        this._query = null;
    },
    /**
     * Get the id of the referenced object.
     *
     * @returns {Integer | null} the record id if it exists.
     */
    async getId(){
        if(!this._query){
            this._query = (
                new QueryBuilder("ir.model.data", ["res_id", "model"])
                .filter([["module", "=", this._module], ["name", "=", this._name]])
                .searchRead()
            );
        }
        var result = await this._query;
        return result.length ? result[0].res_id : null;
    },
});

var references = new Map();

function getXmlId(ref){
    if(!references.has(ref)){
        references.set(ref, new XmlReference(ref));
    }
    return references.get(ref).getId();
}

return getXmlId;

});
