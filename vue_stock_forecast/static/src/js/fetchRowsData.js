odoo.define("vue_stock_forecast.fetchRowsData", function(require){

var QueryBuilder = require("vue.QueryBuilder");
var getXmlId = require("vue.getXmlId");

/**
 * Get a complete array of products matching the selection.
 *
 * The returned array contains all products under the given categories
 * plus the given products.
 *
 * The returned products contain the fields uom_id and display_name.
 *
 * @param {Array} products - the filtered products
 * @param {Array} categories - the filtered product categories
 * @returns {Array} the complete array of products.
 */
function getAllProducts(products, categories){
    return (
        new QueryBuilder("product.product", ["id", "uom_id", "display_name"])
        .filter([
            "&",
            ["type", "in", ["consu", "product"]],
            "|",
            ["categ_id", "child_of", categories.map((c) => c.id)],
            ["id", "in", products.map((p) => p.id)],
        ])
        .searchRead()
    );
}

/**
 * Get all product categories from the selected categories.
 *
 * The returned array includes all children categories.
 * The returned categories contain the field display_name.
 *
 * @param {Array} categories - the filtered product categories
 * @returns {Array} the complete array of product categories.
 */
function getAllCategories(categories){
    return (
        new QueryBuilder("product.category", ["id", "display_name"])
        .filter([["id", "child_of", categories.map((c) => c.id)]])
        .searchRead()
    );
}


/**
 * Group the given product rows by product category.
 *
 * The returned array contains the data to display on the forecast table.
 * when grouping by category.
 *
 * If a category has stocks under different units of measure,
 * one row will be added per unit.
 *
 * @param {Array} productRows - the rows of data per product.
 * @param {Array} categories - the product categories to display
 * @returns {Array} the rows of data per product category.
 */
async function groupRowsByCategory(productRows, categories){
    var categoryRows = [];
    var uomUnitId = await getXmlId("product.product_uom_unit");

    var getMatchingCategoryRow = (category, uom) => {
        var matchingRow = categoryRows.find((r) => r.uom[0] === uom[0] && r.category === category);
        if(matchingRow){
            return matchingRow;
        }
        var newRow = {
            label: uom[0] === uomUnitId ? category.display_name : category.display_name + " (" + uom[1] + ")",
            category,
            uom,
            currentStock: 0,
            reserved: 0,
            incoming: [],
            outgoing: [],
        };
        categoryRows.push(newRow);
        return newRow;
    };

    var allProductIds = productRows.map((r) => r.product.id);

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
            var productRow = productRows.find((r) => r.product.id === product.id);

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

/**
 * Get the planned incoming stock moves for the given products and locations.
 *
 * @param {Array} products - the products for which to find stock moves
 * @param {Array} locations - the destination locations
 * @returns {Array} the incoming stock moves.
 */
async function getIncomingStockMoves(products, locations){
    var query = (
        new QueryBuilder("stock.move", ["product_id", "product_qty", "date_expected"])
        .filter([
            ["state", "not in", ["done", "cancel"]],
            ["location_id.usage", "!=", "internal"],
            ["location_dest_id.usage", "=", "internal"],
        ])
    );
    if(products.length){
        query.filter([["product_id", "in", products.map((p) => p.id)]]);
    }
    if(locations.length){
        query.filter([["location_dest_id", "child_of", locations.map((l) => l.id)]]);
    }
    return query.searchRead();
}

/**
 * Get the planned outgoing stock moves for the given products and locations.
 *
 * @param {Array} products - the products for which to find stock moves
 * @param {Array} locations - the source locations
 * @returns {Array} the outgoing stock moves.
 */
async function getOutgoingStockMoves(products, locations){
    var query = (
        new QueryBuilder("stock.move", ["product_id", "product_qty", "date_expected"])
        .filter([
            ["state", "not in", ["done", "cancel"]],
            ["location_id.usage", "=", "internal"],
            ["location_dest_id.usage", "!=", "internal"],
        ])
    );
    if(products.length){
        query.filter([["product_id", "in", products.map((p) => p.id)]]);
    }
    if(locations.length){
        query.filter([["location_id", "child_of", locations.map((l) => l.id)]]);
    }
    return query.searchRead();
}

/**
 * Get the planned stock quants for the given products and locations.
 *
 * @param {Array} products - the products for which to find stock moves
 * @param {Array} locations - the stock locations
 * @returns {Array} the stock quants.
 */
async function getStockQuants(products, locations){
    var query = (
        new QueryBuilder("stock.quant", ["product_id", "quantity", "reserved_quantity"])
        .filter([
            ["location_id.usage", "=", "internal"],
        ])
    );
    if(products.length){
        query.filter([["product_id", "in", products.map((p) => p.id)]]);
    }
    if(locations.length){
        query.filter([["location_id", "child_of", locations.map((l) => l.id)]]);
    }
    return query.searchRead();
}

/**
 * Get a mapping of stock data per product.
 *
 * @param {Array} products - the products for which to find the quantities
 * @param {Array} locations - the locations in which to find moves and quantities
 * @returns {Map} the stock data mapping.
 */
async function getProductData(products, locations){
    var incomingDeferred = getIncomingStockMoves(products, locations);
    var outgoingDeferred = getOutgoingStockMoves(products, locations);
    var stockDeferred = getStockQuants(products, locations);

    var result = new Map();

    // Initialise default values for each product.
    products.forEach((product) => {
        result.set(product.id, {
            currentStock: 0,
            reserved: 0,
            incoming: [],
            outgoing: [],
        });
    });

    var incomingMoves = await incomingDeferred;
    incomingMoves.forEach((move) => {
        var incoming = result.get(move.product_id[0]).incoming;
        incoming.push({qty: move.product_qty, date: move.date_expected.slice(0, 10)});
    });

    var outgoingMoves = await outgoingDeferred;
    outgoingMoves.forEach((move) => {
        var outgoing = result.get(move.product_id[0]).outgoing;
        outgoing.push({qty: move.product_qty, date: move.date_expected.slice(0, 10)});
    });

    var quants = await stockDeferred;
    quants.forEach((quant) => {
        var productData = result.get(quant.product_id[0]);
        productData.currentStock += quant.quantity;
        productData.reservedQuantity += quant.reserved_quantity;
    });

    return result;
}

/**
 * Get the rows to display on the stock forecast table.
 *
 * Each returned row contains the following structure:
 * {
 *    product: {Object} the product if grouping by product,
 *    category: {Object} the product category if grouping by category,
 *    label: {String} the product or product category's display name,
 *    uom: {Array} the unit of measure [id, name],
 *    currentStock: {Number} the quantity in inventory,
 *    reserved: {Number} the reserved quantity in inventory,
 *    incoming: {Array} the incoming stock moves,
 *    outgoing: {Array} the outgoing stock moves,
 * }
 *
 * @param {Array} products - the filtered products
 * @param {Array} categories - the filtered product categories
 * @param {Array} locations - the filtered stock locations
 * @param {String} groupBy - the grouping of the rows (either 'product' or 'category')
 * @returns {Array} the data of the rows to display on the widget.
 */
async function fetchRowsData(products, categories, locations, groupBy){
    var allProducts = await getAllProducts(products, categories);
    var allProductsData = await getProductData(allProducts, locations);

    var productRows = allProducts.map((product) => {
        var rowData = {
            label: product.display_name,
            product,
            uom: product.uom_id,
            currentStock: 0,
            reserved: 0,
            incoming: [],
            outgoing: [],
        };

        var stockData = allProductsData.get(product.id);
        rowData.currentStock = stockData.currentStock;
        rowData.reserved = stockData.reserved;
        rowData.incoming = stockData.incoming;
        rowData.outgoing = stockData.outgoing;

        return rowData;
    });

    if(groupBy === "category"){
        var allCategories = await getAllCategories(categories);
        return await groupRowsByCategory(productRows, allCategories);
    }

    return productRows;
}

return fetchRowsData;

});
