const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {  
  entry: ["./src/js/main.js"],
  mode: "production",
  devtool: false,
  output: {filename: "vueStockForecast.js"},
  module: {
    rules: [
      {test: /\.js$/, loader: "babel-loader", query: {presets: ["env"]}},
      {test: /\.vue$/, loader: "vue-loader"},
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
