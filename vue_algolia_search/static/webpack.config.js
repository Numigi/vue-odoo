const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {  
  entry: ["./src/js/main.js"],
  mode: "development",
  devtool: false,
  output: {filename: "vueAlgoliaSearch.js"},
  module: {
    rules: [
      {test: /\.js$/, loader: "babel-loader"},
      {test: /\.vue$/, loader: "vue-loader"},
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
