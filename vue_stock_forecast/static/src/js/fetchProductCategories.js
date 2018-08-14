odoo.define("vue_stock_forecast.fetchProductCategories", function(require){

var QueryBuilder = require("vue_stock_forecast.QueryBuilder");

function fetchProductCategories(productCategories){
    var query = new QueryBuilder("product.category", ["display_name"]);

    if(productCategories.length){
        query.filter([["id", "child_of", productCategories.map(c => c.id)]]);
    }

    return query.searchRead();
}

return fetchProductCategories;

});
