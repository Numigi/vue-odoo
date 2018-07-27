<template>

<table class="o_stock_forecast_table">
    <thead>
        <tr>
            <th></th>
            <th v-for="dateGroup in dateGroups" :key="dateGroup.key">
                {{ dateGroup.label }}
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="productGroup in productGroups" :key="productGroup.key">
            <td>
                {{ productGroup.label }}
            </td>
            <td v-for="dateGroup in dateGroups" :key="dateGroup.key">
                {{ getStockValue(productGroup, dateGroup) }}
            </td>
        </tr>
    </tbody>
</table>

</template>

<script>

export default {
    props: {
        dateGroups: {
            type: Array,
            required: true,
        },
        productGroups: {
            type: Array,
            required: true,
        },
        stockMoveData: {
            type: Map,
            required: true,
        },
    },
    methods: {
        getStockValue(productGroup, dateGroup){
            var productData = this.stockMoveData.get(productGroup.key);
            var currentStock = productData.currentStock;

            var stockMoveSum = (result, m) => result + m.qty;

            var movesBeforeDate = (move) => move.date <= dateGroup.key;
            var incommingQty = productData.incomming.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var outgoingQty = productData.outgoing.filter(movesBeforeDate).reduce(stockMoveSum, 0);
            var stockAtDate = currentStock + incommingQty - outgoingQty;

            var movesAtDate = (move) => move.date === dateGroup.key;
            var incommingQtyAtDate = productData.incomming.filter(movesAtDate).reduce(stockMoveSum, 0);
            var outgoingQtyAtDate = productData.outgoing.filter(movesAtDate).reduce(stockMoveSum, 0);

            return String(stockAtDate) + " (+" + String(incommingQtyAtDate) + " / " + "-" + String(outgoingQtyAtDate) + ")";
        },
    },
};

</script>
