"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ComponentPlugin = require("component-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
    entry: [
      "webpack-hot-middleware/client?reload=true",
      path.join(__dirname, "index.js")
    ],
    output: {
      path: path.join(__dirname, "/public/"),
      filename: "index.js",
      publicPath: "/"
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new ComponentPlugin(),
    new HtmlWebpackPlugin({
      template: "framework/server/partials/index.tpl.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development")
      })
    ],
    module: {
      loaders: [{
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel"
      },{
        test: /\.json?$/,
        loader: "json"
      },{ 
        test: /\.css$/, 
        loader: "style!css" 
      },{ 
        test: /\.html$/, 
        loader: "ng-cache?prefix=[dir]/[dir]" 
      }]
    }
};
