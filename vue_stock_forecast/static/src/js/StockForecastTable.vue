<template>
  <div class="stock-forecast-table">
    <el-table :data="rows" height="800" border>
      <el-table-column :label="rowGroupLabel" width="300" fixed="left">
        <template slot-scope="scope">
          <div>
            {{ scope.row.label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Stock')" width="150" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link" @click="currentStockClicked(scope.row)" v-if="scope.row.currentStock">
            {{ displayCurrentStock(scope.row) }}
          </div>
          <div v-else>0</div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Reserved')" width="150" align="center">
        <template slot-scope="scope">
          <div>
            {{ displayReservedStock(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Available')" width="150" align="center">
        <template slot-scope="scope">
          <div>
            {{ displayAvailableStock(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="dateGroup in dateGroups" :key="dateGroup.key" :label="dateGroup.label" width="150" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link"
            @click="moveAmountClicked(scope.row, dateGroup.key)"
            v-if="productHasMovesAtDate(scope.row, dateGroup.key)">
            {{ getStockValue(scope.row, dateGroup.key) }}
          </div>
          <div v-else>{{ getStockValue(scope.row, dateGroup.key) }}</div>
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
            required: true,
        },
        rowGroupBy: {
            type: String,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        translate: {
            type: Function,
            required: true,
        },
    },
    computed: {
        dateGroups(){
            return getDateRange(this.dateFrom, this.dateTo, this.dateGroupBy || "month");
        },
        rowGroupLabel(){
            var label = this.rowGroupBy === "product" ? "Product" : "Product Category";
            return this.translate(label);
        },
    },
    methods: {
        productHasMovesAtDate(row, dateTo){
            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy || "month").format("YYYY-MM-DD");
            var movesAtDate = (move) => dateFrom < move.date && move.date <= dateTo;

            return (
              row.incoming.filter(movesAtDate).length > 0 ||
              row.outgoing.filter(movesAtDate).length > 0
            )
        },
        getStockValue(row, dateTo){
            var stockMoveSum = (result, move) => result + move.qty;

            var movesBeforeDate = (move) => move.date <= dateTo;
            var incomingQty = row.incoming.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var outgoingQty = row.outgoing.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var stockAtDate = row.currentStock + incomingQty - outgoingQty;

            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy).format("YYYY-MM-DD");

            var movesAtDate = (move) => dateFrom < move.date && move.date <= dateTo;
            var incomingQtyAtDate = row.incoming.filter(movesAtDate).reduce(stockMoveSum, 0);
            var outgoingQtyAtDate = row.outgoing.filter(movesAtDate).reduce(stockMoveSum, 0);

            if(incomingQtyAtDate && outgoingQtyAtDate){
                return String(stockAtDate) + " (+" + String(incomingQtyAtDate) + " / " + "-" + String(outgoingQtyAtDate) + ")";
            }
            else if(incomingQtyAtDate){
                return String(stockAtDate) + " (+" + String(incomingQtyAtDate) + ")";
            }
            else if(outgoingQtyAtDate){
                return String(stockAtDate) + " (-" + String(outgoingQtyAtDate) + ")";
            }
            else {
                return String(stockAtDate);
            }
        },
        displayCurrentStock(row){
            return row.currentStock;
        },
        displayReservedStock(row){
            return row.reserved;
        },
        displayAvailableStock(row){
            return row.currentStock - row.reserved;
        },
        currentStockClicked(row){
            this.$emit('current-stock-clicked', row);
        },
        moveAmountClicked(row, dateTo){
            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy).add(1, "day").format("YYYY-MM-DD");
            this.$emit('move-amount-clicked', row, dateFrom, dateTo);
        },
    },
};

</script>
