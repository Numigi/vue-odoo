odoo.define("vue_stock_forecast.fetchStockData", function(require){

var QueryBuilder = require("vue_stock_forecast.QueryBuilder");
var XmlReference = require("vue_stock_forecast.XmlReference");

var uomUnit = new XmlReference("product", "product_uom_unit");

async function fetchStockData(products, categories, locations, groupBy){
    var allProducts = await getAllProducts(products, categories);
    var allProductsData = await getProductData(allProducts, locations);

    var productRows = allProducts.map((product) => {
        var rowData = {
            label: product.display_name,
            product: product,
            uom: product.uom_id,
            currentStock: 0,
            reserved: 0,
            incoming: [],
            outgoing: [],
        }

        if(allProductsData.has(product.id)){
            var stockData = allProductsData.get(product.id);
            rowData.currentStock = stockData.currentStock;
            rowData.reserved = stockData.reserved;
            rowData.incoming = stockData.incoming;
            rowData.outgoing = stockData.outgoing;
        }

        return rowData;
    });

    if(groupBy === "category"){
        var allCategories = await getAllCategories(categories);
        return await groupRowsByCategory(productRows, allCategories);
    }

    return productRows;
}

function getAllProducts(products, categories){
    return (
        new QueryBuilder("product.product", ["id", "uom_id", "display_name"])
        .filter([
            "|",
            ["categ_id", "child_of", categories.map((c) => c.id)],
            ["id", "in", products.map((p) => p.id)],
        ])
        .searchRead()
    );
}

async function getProductData(products, locations){
    var incomingDeferred = getIncomingMoveData(products, locations);
    var outgoingDeferred = getOutgoingMoveData(products, locations);
    var stockDeferred = getCurrentStockData(products, locations);

    var productData = new Map();

    var setDefault = (productId) => {
        if(!productData.has(productId)){
            productData.set(productId, {
                uom: null,
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
        var incoming = productData.get(move.product_id[0]).incoming;
        incoming.push({qty: move.product_qty, date: move.date_expected.slice(0, 10)});
    });

    var outgoingMoves = await outgoingDeferred;
    outgoingMoves.forEach(move => {
        setDefault(move.product_id[0]);
        var outgoing = productData.get(move.product_id[0]).outgoing;
        outgoing.push({qty: move.product_qty, date: move.date_expected.slice(0, 10)});
    });

    var quants = await stockDeferred;
    quants.forEach(quant => {
        setDefault(quant.product_id[0]);
        productData.get(quant.product_id[0]).currentStock += quant.quantity;
        productData.get(quant.product_id[0]).reservedQuantity += quant.reserved_quantity;
    });

    return productData;
}

function getAllCategories(categories){
    return (
        new QueryBuilder("product.category", ["id", "display_name"])
        .filter([["id", "child_of", categories.map((c) => c.id)]])
        .searchRead()
    );
}

async function groupRowsByCategory(productRows, categories){
    var categoryRows = [];
    var uomUnitId = await uomUnit.getId();

    var getMatchingCategoryRow = (category, uom) => {
        var matchingRow = categoryRows.find(r => r.uom[0] === uom[0] && r.category === category);
        if(matchingRow){
            return matchingRow;
        }
        var newRow = {
            label: uom[0] === uomUnitId ? category.display_name : category.display_name + " (" + uom[1] + ")",
            category: category,
            uom: uom,
            currentStock: 0,
            reserved: 0,
            incoming: [],
            outgoing: [],
        };
        categoryRows.push(newRow);
        return newRow;
    }

    var allProductIds = productRows.map(r => r.product.id);

    var queries = categories.map(async (category) => {
        var query = (
            new QueryBuilder("product.product", ["id", "uom_id"])
            .filter([
                ["categ_id", "child_of", category.id],
                ["id", "in", allProductIds],
            ])
        );

        var products = await query.searchRead();

        products.forEach((product) => {
            var productRow = productRows.find(r => r.product.id === product.id);

            if(productRow){
                var categoryRow = getMatchingCategoryRow(category, product.uom_id);
                categoryRow.currentStock += productRow.currentStock;
                categoryRow.reserved += productRow.reserved;
                categoryRow.incoming = categoryRow.incoming.concat(productRow.incoming);
                categoryRow.outgoing = categoryRow.outgoing.concat(productRow.outgoing);
            }
        });
    });

    await Promise.all(queries);
    return categoryRows;
}

async function getIncomingMoveData(products, categories, locations){
    var query = (
        new QueryBuilder("stock.move", ["product_id", "product_qty", "date_expected"])
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
        new QueryBuilder("stock.move", ["product_id", "product_qty", "date_expected"])
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
