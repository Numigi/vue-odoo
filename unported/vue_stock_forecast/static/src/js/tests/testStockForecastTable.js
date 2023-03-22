
import test from "ava";
import ElementUI from "element-ui";
import Vue from "vue";

import StockForecastTable from "../StockForecastTable.vue";
import pretty from "pretty";

Vue.use(ElementUI);

var propsData = {
    dateFrom: moment("2018-01-01").toDate(),
    dateTo:  moment("2018-03-31").toDate(),
    dateGroupBy: "month",
    rowGroupBy: "product",
    rows: [
        {
            label: "Product A",
            currentStock: 4,
            reserved: 3,
            incoming: [{date: "2018-01-01", qty: 2}, {date: "2018-02-01", qty: 3}, {date: "2018-03-01", qty: 4}],
            outgoing: [{date: "2018-01-31", qty: 5}, {date: "2018-02-28", qty: 6}, {date: "2018-03-31", qty: 7}],
        },
        {
            label: "Product B",
            currentStock: 2,
            reserved: 1,
            incoming: [{date: "2018-01-10", qty: 10}],
            outgoing: [{date: "2018-03-10", qty: 20}],
        },
    ],
    translate: (term) => term,
    firstColumnFixed: false,
};

test("Render Forecast Table", async (t) => {
    var Constructor = Vue.extend(StockForecastTable);
    var vm = new Constructor({propsData}).$mount();
    await vm.$nextTick();
    t.snapshot(pretty(vm.$el.outerHTML));
});
