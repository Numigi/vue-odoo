odoo.define("vue_stock_forecast.fetchProducts", function(require){

var QueryBuilder = require("vue_stock_forecast.QueryBuilder");

function fetchProducts(products, productCategories){
    var query = new QueryBuilder("product.product", ["display_name"]);

    if(products.length){
        query.filter([["id", "in", products.map(p => p.id)]]);
    }

    if(productCategories.length){
        query.filter([["categ_id", "child_of", productCategories.map(c => c.id)]]);
    }

    return query.searchRead();
}

return fetchProducts;

});
