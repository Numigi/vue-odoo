odoo.define("vue_stock_forecast.fetchStockData", function(require){

var QueryBuilder = require("vue_stock_forecast.QueryBuilder");

async function fetchStockData(products, categories, locations, groupBy){
    var incomingDeferred = getIncomingMoveData(products, categories, locations);
    var outgoingDeferred = getOutgoingMoveData(products, categories, locations);
    var stockDeferred = getCurrentStockData(products, categories, locations);

    var result = new Map();

    var setDefault = (productId) => {
        if(!result.has(productId)){
            result.set(productId, {
                currentStock: 0,
                reserved: 0,
                incoming: [],
                outgoing: [],
            });
        }
    }

    var incomingMoves = await incomingDeferred;
    incomingMoves.forEach(move => {
        setDefault(move.product_id[0]);
        var incoming = result.get(move.product_id[0]).incoming;
        incoming.push({qty: move.product_uom_qty, date: move.date_expected.slice(0, 10)});
    });

    var outgoingMoves = await outgoingDeferred;
    outgoingMoves.forEach(move => {
        setDefault(move.product_id[0]);
        var outgoing = result.get(move.product_id[0]).outgoing;
        outgoing.push({qty: move.product_uom_qty, date: move.date_expected.slice(0, 10)});
    });

    var quants = await stockDeferred;
    quants.forEach(quant => {
        setDefault(quant.product_id[0]);
        result.get(quant.product_id[0]).currentStock += quant.quantity;
        result.get(quant.product_id[0]).reservedQuantity += quant.reserved_quantity;
    });

    if(groupBy === "category"){
        return await mergeStockDataByCategory(result, categories);
    }

    return result;
}

async function mergeStockDataByCategory(stockDataByProduct, categories){
    var result = new Map();

    var filteredProductIds = new Array(...stockDataByProduct.keys());

    var setDefault = (categoryId) => {
        if(!result.has(categoryId)){
            result.set(categoryId, {
                currentStock: 0,
                reserved: 0,
                incoming: [],
                outgoing: [],
            });
        }
    }

    var queries = categories.map(async (category) => {
        setDefault(category.id);
        var categoryData = result.get(category.id);

        var query = (
            new QueryBuilder("product.product", ["id"])
            .filter([
                ["categ_id", "child_of", category.id],
                ["id", "in", filteredProductIds],
            ])
        );

        var products = await query.searchRead();
        var productsWithData = products.filter((product) => stockDataByProduct.has(product.id));
        productsWithData.forEach((product) => {
            var productData = stockDataByProduct.get(product.id);
            categoryData.currentStock += productData.currentStock;
            categoryData.reserved += productData.reserved;
            categoryData.incoming = categoryData.incoming.concat(productData.incoming);
            categoryData.outgoing = categoryData.outgoing.concat(productData.outgoing);
        });
    });

    await Promise.all(queries);
    return result;
}

async function getIncomingMoveData(products, categories, locations){
    var query = (
        new QueryBuilder("stock.move", ["product_id", "product_uom_qty", "date_expected"])
        .filter([
            ["state", "not in", ["done", "cancel"]],
            ["location_id.usage", "!=", "internal"],
            ["location_dest_id.usage", "=", "internal"],
        ])
    );

    filterProducts(query, products);
    filterProductCategories(query, categories);

    if(locations){
        query.filter([["location_dest_id", "in", locations.map(l => l.id)]]);
    }

    return query.searchRead();
}

async function getOutgoingMoveData(products, categories, locations){
    var query = (
        new QueryBuilder("stock.move", ["product_id", "product_uom_qty", "date_expected"])
        .filter([
            ["state", "not in", ["done", "cancel"]],
            ["location_id.usage", "=", "internal"],
            ["location_dest_id.usage", "!=", "internal"],
        ])
    );

    filterProducts(query, products);
    filterProductCategories(query, categories);
    filterLocations(query, locations);

    return query.searchRead();
}

async function getCurrentStockData(products, categories, locations){
    var query = (
        new QueryBuilder("stock.quant", ["product_id", "quantity", "reserved_quantity"])
        .filter([
            ["location_id.usage", "=", "internal"],
        ])
    )

    filterProducts(query, products);
    filterProductCategories(query, categories);
    filterLocations(query, locations);

    return query.searchRead();
}

function filterProducts(query, products){
    if(products && products.length){
        query.filter([["product_id", "in", products.map(p => p.id)]]);
    }
}

function filterProductCategories(query, categories){
    if(categories && categories.length){
        query.filter([["product_id.categ_id", "child_of", categories.map(c => c.id)]]);
    }
}

function filterLocations(query, locations){
    if(locations && locations.length){
        query.filter([["location_id", "child_of", locations.map(l => l.id)]]);
    }
}

return fetchStockData;

});
