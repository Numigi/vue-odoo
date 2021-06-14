<template>
<div class="stock-forecast-table">
    <table>
        <thead>
            <tr>
                <th>
                    {{ rowGroupLabel }}
                </th>
                <th>
                    {{ translate('Stock ') }}
                </th>
                <th>
                    {{ translate('Reserved ') }}
                </th>
                <th>
                    {{ translate('Available ') }}
                </th>
                <th>
                    {{ translate('Min / Max ') }}
                </th>
                <th>
                    {{ translate('Quotation ') }}
                </th>
                <th v-for="dateGroup in dateGroups" :key="dateGroup.date">
                    {{ dateGroup.date }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.key">
                <td>
                    {{ row.label }}
                </td>
                <td>
                    <div
                        class="stock-forecast-table__link"
                        @click="currentStockClicked(row)"
                        v-if="row.currentStock"
                    >
                        {{ displayCurrentStock(row) }}
                    </div>
                    <div v-else>0</div>
                </td>
                <td>
                    {{ displayReservedStock(row) }}
                </td>
                <td>
                    {{ displayAvailableStock(row) }}
                </td>
                <td>
                    <div class="stock-forecast-table__link" @click="minMaxClicked(row)">
                        {{ displayMinMax(row) }}
                    </div>
                </td>
                <td>
                    <div class="stock-forecast-table__link" @click="purchasedClicked(row)">
                        {{ displayPurchased(row) }}
                    </div>
                </td>
                <td v-for="dateGroup in dateGroups" :key="dateGroup.key">
                    <div class="stock-forecast-table__link stock-forecast-table__amount"
                        @click="moveAmountClicked(row, dateGroup.date)"
                        v-if="productHasMovesAtDate(row, dateGroup.date)">
                        {{ getStockValue(row, dateGroup.date) }}
                    </div>
                    <div v-else>
                        {{ getStockValue(row, dateGroup.date) }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
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
    data() {
        return {
            dateGroups: []
        }
    },
    mounted() {
        this.computeDateGroups()
    },
    watch: {
        dateFrom() {
            this.computeDateGroups()
        },
        dateTo() {
            this.computeDateGroups()
        },
        dateGroupBy() {
            this.computeDateGroups()
        },
    },
    computed: {
        rowGroupLabel(){
            var label = this.rowGroupBy === "product" ? "Product" : "Product Category";
            return this.translate(label);
        },
    },
    methods: {
        computeDateGroups(){
            this.dateGroups = makeDateGroups(this.dateFrom, this.dateTo, this.dateGroupBy || "month");
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
