odoo.define({"vue_stock_forecast.StockForecastFetcher"}, function(require){

var data = require("web.data");

class StockForecastFetcher {
    async fetchData(products){
        var incomingDeferred = this._getIncomingMoveData(products);
        var outgoingDeferred = this._getOutgoingMoveData(products);
        var stockDeferred = this._getCurrentStockData(products);

        var result = new Map();

        products.forEach(p => {
            result.set(p.id, {
                currentStock: 0,
                incoming: [],
                outgoing: [],
            });
        });

        var incomingMoves = await incomingDeferred;
        incomingMoves.forEach(move => {
            var incoming = result.get(move.product_id[0]).incoming;
            incoming.push({qty: move.product_qty, date: move.date_expected});
        });

        var outgoingMoves = await outgoingDeferred;
        outgoingMoves.forEach(move => {
            var outgoing = result.get(move.product_id[0]).outgoing;
            outgoing.push({qty: move.product_qty, date: move.date_expected});
        });

        var quants = await stockDeferred;
        quants.forEach(quant => {
            var result.get(quant.product_id[0]).currentStock = quant.qty;
        });

        return result;
    }

    _getIncomingMoveData(products){
        var query = (
            new data.Query("stock.move", ["product_qty"])
            .filter([
                ["state", "not in", ["done", "cancel"]],
                ["location_id.usage", "!=", "internal"],
                ["location_dest_id.usage", "=", "internal"],
                ["product_id", "in", products.map(p => p.id)],
            ])
        );

        return query.group_by(["product_id", "date_expected"]);
    }

    _getOutgoingMoveData(products){
        var query = (
            new data.Query("stock.move", ["product_qty"])
            .filter([
                ["state", "not in", ["done", "cancel"]],
                ["location_id.usage", "=", "internal"],
                ["location_dest_id.usage", "!=", "internal"],
                ["product_id", "in", products.map(p => p.id)],
            ])
        );

        return query.group_by(["product_id", "date_expected"]);
    }

    _getCurrentStockData(products){
        var query = (
            new data.Query("stock.quant", ["qty"])
            .filter([
                ["location_id.usage", "=", "internal"],
                ["product_id", "in", products.map(p => p.id)],
            ])
        )

        return query.group_by(["product_id"]);
    }
}

return StockForecastFetcher;

});
