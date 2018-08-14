
import test from "ava"
import Vue from 'vue'
import StockForecastTable from '../StockForecastTable.vue'

var dateGroups = [
    {key: "2018-01", label: "January 2018"},
    {key: "2018-02", label: "February 2018"},
    {key: "2018-03", label: "March 2018"},
];

var products = [
    {id: 1, label: "Product A"},
    {id: 2, label: "Product B"},
];

var stockData = (
    new Map()
    .set(1, {
        currentStock: 10,
        incomming: [{date: "2018-01", qty: 2}, {date: "2018-02", qty: 3}, {date: "2018-03", qty: 4}],
        outgoing: [{date: "2018-01", qty: 5}, {date: "2018-02", qty: 6}, {date: "2018-03", qty: 7}],
    })
    .set(2, {
        currentStock: 5,
        incomming: [{date: "2018-01", qty: 10}],
        outgoing: [{date: "2018-03", qty: 20}],
    })
);

test("Render Forecast Table", t => {
    var Constructor = Vue.extend(StockForecastTable);
    var vm = new Constructor({
        propsData: {
            stockData,
            products,
            dateGroups,
        }
    }).$mount();
    t.snapshot(vm.$el.outerHTML);
});
