
module.exports = {  
  entry: "./main.js",
  mode: "production",
  output: {filename: "vueStockForecast.js"},
  module: {
    rules: [
      {test: /\.js$/, loader: "babel-loader", query: {presets: ["env"]}},
      {test: /\.vue$/, loader: "vue-loader"},
    ]
  }
};
