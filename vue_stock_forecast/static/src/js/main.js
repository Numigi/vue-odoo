
import StockForecastReport from "./StockForecastReport.vue";
import StockForecastTable from "./StockForecastTable.vue";

Vue.component("stock-forecast-report", StockForecastReport);
Vue.component("stock-forecast-table", StockForecastTable);

window.vueStockForecast = {StockForecastReport, StockForecastTable};
