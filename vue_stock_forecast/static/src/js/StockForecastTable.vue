<template>
  <div class="stock-forecast-table">
    <el-table :data="tableData" height="800" border>
      <el-table-column prop="label" label="Product" width="300" fixed="left"></el-table-column>
      <el-table-column label="Stock" width="150" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link" @click="currentStockClicked(scope.row.id)" v-if="scope.row.currentStock">
            {{ scope.row.currentStock }}
          </div>
          <div v-else>0</div>
        </template>
      </el-table-column>
      <el-table-column prop="reserved" label="Reserved" width="150" align="center"></el-table-column>
      <el-table-column prop="available" label="Available" width="150" align="center"></el-table-column>
      <el-table-column v-for="dateGroup in dateGroups" :key="dateGroup.key" :label="dateGroup.label" width="150" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link"
            @click="moveAmountClicked(scope.row.id, dateGroup.key)"
            v-if="productHasMovesAtDate(scope.row.id, dateGroup.key)">
            {{ getStockValue(scope.row.id, dateGroup.key) }}
          </div>
          <div v-else>{{ getStockValue(scope.row.id, dateGroup.key) }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

function getDateRange(dateFrom, dateTo, dateGroupBy){
    var dateRange = [];
    var currentMoment = moment(dateFrom);
    var momentTo = moment(dateTo);

    while(currentMoment < momentTo){
        currentMoment.endOf(dateGroupBy);
        dateRange.push({
            key: currentMoment.format("YYYY-MM-DD"),
            label: currentMoment.format("YYYY-MM-DD"),
        });
        currentMoment.add(1, dateGroupBy);
    }

    return dateRange;
}

export default {
    props: {
        dateFrom: {
            type: Date,
            required: true,
        },
        dateTo: {
            type: Date,
            required: true,
        },
        dateGroupBy: {
            type: String,
            default: "month",
        },
        products: {
            type: Array,
            required: true,
        },
        stockData: {
            type: Map,
            required: true,
        },
    },
    computed: {
        effectiveDateGroupBy(){
            return this.dateGroupBy || "month";
        },
        dateGroups(){
            return getDateRange(this.dateFrom, this.dateTo, this.effectiveDateGroupBy);
        },
        tableData(){
            return this.products.map(product => {
                var productData = {
                    id: product.id,
                    label: product.display_name,
                    currentStock: this.getCurrentStock(product),
                    reserved: this.getReservedStock(product),
                    available: this.getAvailableStock(product),
                }
                return productData;
            });
        },
    },
    methods: {
        productHasMovesAtDate(productId, dateTo){
            var stockData = this.stockData.get(productId);
            if(!stockData){
                return false;
            }

            var dateFrom = moment(dateTo).subtract(1, this.effectiveDateGroupBy).format("YYYY-MM-DD");
            var movesAtDate = (move) => dateFrom < move.date && move.date <= dateTo;

            return (
              stockData.incoming.filter(movesAtDate).length > 0 ||
              stockData.outgoing.filter(movesAtDate).length > 0
            )
        },
        getStockValue(productId, dateTo){
            var stockData = this.stockData.get(productId);
            if(!stockData){
                return 0;
            }

            var stockMoveSum = (result, m) => result + m.qty;

            var movesBeforeDate = (move) => move.date <= dateTo;
            var incomingQty = stockData.incoming.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var outgoingQty = stockData.outgoing.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var stockAtDate = stockData.currentStock + incomingQty - outgoingQty;

            var dateFrom = moment(dateTo).subtract(1, this.effectiveDateGroupBy).format("YYYY-MM-DD");
            var dateTo = dateTo;
            var movesAtDate = (move) => dateFrom < move.date && move.date <= dateTo;

            var incomingQtyAtDate = stockData.incoming.filter(movesAtDate).reduce(stockMoveSum, 0);
            var outgoingQtyAtDate = stockData.outgoing.filter(movesAtDate).reduce(stockMoveSum, 0);

            if(incomingQtyAtDate && outgoingQtyAtDate){
                return String(stockAtDate) + " (+" + String(incomingQtyAtDate) + " / " + "-" + String(outgoingQtyAtDate) + ")";
            }
            else if(incomingQty){
                return String(stockAtDate) + " (+" + String(incomingQtyAtDate) + ")";
            }
            else if(outgoingQtyAtDate){
                return String(stockAtDate) + " (-" + String(outgoingQtyAtDate) + ")";
            }
            else {
                return String(stockAtDate);
            }
        },
        getCurrentStock(product){
            var stockData = this.stockData.get(product.id);
            return stockData ? stockData.currentStock : 0;
        },
        getReservedStock(product){
            var stockData = this.stockData.get(product.id);
            return stockData ? stockData.reserved : 0;
        },
        getAvailableStock(product){
            var stockData = this.stockData.get(product.id);
            return stockData ? stockData.currentStock - stockData.reserved : 0;
        },
        currentStockClicked(productId){
            this.$emit('current-stock-clicked', productId);
        },
        moveAmountClicked(productId, dateToString){
            var dateFrom = (
              moment(dateToString)
              .subtract(1, this.effectiveDateGroupBy)
              .add(1, this.effectiveDateGroupBy)
              .format("YYYY-MM-DD")
            );
            var dateTo = dateToString;
            this.$emit('move-amount-clicked', productId, dateFrom, dateTo);
        },
    },
};

</script>
