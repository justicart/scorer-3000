var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    application: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: path.resolve(path.join(__dirname, '..', 'public'))
  },
  resolve: {
    modules: ['client', 'node_modules'],
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: [ path.join(__dirname, "..", "client")],
        options: { cacheDirectory: true }
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.css$/, loader: "css-loader" }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
  devtool: 'source-map'
};
