<template>
  <div class="stock-forecast-table">
    <el-table :data="rows" height="800" border row-key="key" ref="table">
      <el-table-column :label="rowGroupLabel" width="300" :fixed="firstColumnFixed">
        <template slot-scope="scope">
          <div>
            {{ scope.row.label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Stock ')" width="160" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link" @click="currentStockClicked(scope.row)" v-if="scope.row.currentStock">
            {{ displayCurrentStock(scope.row) }}
          </div>
          <div v-else>0</div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Reserved ')" width="160" align="center">
        <template slot-scope="scope">
          <div>
            {{ displayReservedStock(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Available ')" width="160" align="center">
        <template slot-scope="scope">
          <div>
            {{ displayAvailableStock(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Min / Max ')" width="160" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link" @click="minMaxClicked(scope.row)">
            {{ displayMinMax(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="translate('Quotation ')" width="160" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link" @click="purchasedClicked(scope.row)">
            {{ displayPurchased(scope.row) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="dateGroup in dateGroups" :key="dateGroup.key" :label="dateGroup.date" width="160" align="center">
        <template slot-scope="scope">
          <div class="stock-forecast-table__link stock-forecast-table__amount"
            @click="moveAmountClicked(scope.row, dateGroup.date)"
            v-if="productHasMovesAtDate(scope.row, dateGroup.date)">
            {{ getStockValue(scope.row, dateGroup.date) }}
          </div>
          <div v-else>{{ getStockValue(scope.row, dateGroup.date) }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

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
        firstColumnFixed: {
            type: Boolean,
            default: true,
        },
    },
    data: function data() {
        return {
            dateGroups: []
        };
    },
    mounted: function mounted() {
        this.computeDateGroups();
    },

    watch: {
        dateFrom: function dateFrom() {
            this.computeDateGroups();
        },
        dateTo: function dateTo() {
            this.computeDateGroups();
        },
        dateGroupBy: function dateGroupBy() {
            this.computeDateGroups();
        }
    },
    computed: {
        rowGroupLabel(){
            var label = this.rowGroupBy === "product" ? "Product" : "Product Category";
            return this.translate(label);
        },
    },
    methods: {
        computeDateGroups: function computeDateGroups() {
            this.dateGroups = makeDateGroups(this.dateFrom, this.dateTo, this.dateGroupBy || "month");
            setTimeout(() => this.refreshTableLayout(), 500)
            setTimeout(() => this.refreshTableLayout(), 1000)
            setTimeout(() => this.refreshTableLayout(), 2000)
        },
        refreshTableLayout() {
            this.$refs.table.doLayout();
        },
        productHasMovesAtDate(row, dateTo){
            var dateFrom = moment(dateTo).subtract(1, this.dateGroupBy || "month").format("YYYY-MM-DD");
            function movesAtDate(move) {
                return dateFrom < move.date && move.date <= dateTo
            }

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

            var dateFrom = this.getDateFrom(dateTo)

            function movesAtDate(move) {
                return dateFrom <= move.date && move.date <= dateTo
            }
            var incomingQtyAtDate = row.incoming.filter(movesAtDate).reduce(stockMoveSum, 0);
            var outgoingQtyAtDate = row.outgoing.filter(movesAtDate).reduce(stockMoveSum, 0);

            if(incomingQtyAtDate && outgoingQtyAtDate){
                return round(stockAtDate) + " (+" + round(incomingQtyAtDate) + " / " + "-" + round(outgoingQtyAtDate) + ")";
            }
            else if(incomingQtyAtDate){
                return round(stockAtDate) + " (+" + round(incomingQtyAtDate) + ")";
            }
            else if(outgoingQtyAtDate){
                return round(stockAtDate) + " (-" + round(outgoingQtyAtDate) + ")";
            }
            else {
                return round(stockAtDate);
            }
        },
        displayCurrentStock(row){
            return round(row.currentStock);
        },
        displayReservedStock(row){
            return round(row.reserved);
        },
        displayAvailableStock(row){
            return round(row.currentStock - row.reserved);
        },
        displayMinMax(row){
            const min = row.min
            const max = row.max
            return (min || 0).toFixed() + " / " + (max || 0).toFixed()
        },
        displayPurchased(row) {
            return round(row.purchased);
        },
        currentStockClicked(row){
            this.$emit('current-stock-clicked', row);
        },
        minMaxClicked(row){
            this.$emit('min-max-clicked', row);
        },
        purchasedClicked(row) {
            this.$emit('purchased-clicked', row);
        },
        moveAmountClicked(row, dateTo){
            var dateFrom = this.getDateFrom(dateTo)
            this.$emit('move-amount-clicked', row, dateFrom, dateTo);
        },
        getDateFrom(dateTo) {
            if (this.dateGroupBy === "month") {
                return moment(dateTo).startOf("month").format("YYYY-MM-DD");
            }
            else {
                return moment(dateTo).subtract(1, "week").add(1, "day").format("YYYY-MM-DD");
            }
        }
    },
};

let nextGroupKey = 1

function makeDateGroups(dateFrom, dateTo, dateGroupBy){
    var dateRange = [];
    var currentMoment = moment(dateFrom);
    var momentTo = moment(dateTo);

    while(currentMoment < momentTo){
        currentMoment.endOf(dateGroupBy);
        dateRange.push({
            key: nextGroupKey++,
            date: currentMoment.format("YYYY-MM-DD"),
        });
        currentMoment.add(1, dateGroupBy);
    }

    return dateRange;
}

function round(amount) {
    return amount ? amount.toFixed(2).replace(" ", " ") : "0"
}

</script>
