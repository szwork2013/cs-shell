"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ComponentPlugin = require("component-webpack-plugin");

var sassGlobals = require("./framework/client/styles/app.variables");
var sassVars = JSON.stringify(sassGlobals);

module.exports = {
  devtool: "eval-source-map",
    entry: [
      "webpack-hot-middleware/client?reload=true",
      path.join(__dirname, "framework/index.js")
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
        loaders: ["style", "css", "sass","jsontosass?" + sassVars]
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
      },{ 
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   
        loader: "url?limit=10000&mimetype=application/font-woff" },
      { 
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  
        loader: "url?limit=10000&mimetype=application/font-woff" },
      { 
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    
        loader: "url?limit=10000&mimetype=application/octet-stream" },
      { 
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    
        loader: "file" },
      { 
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    
        loader: "url?limit=10000&mimetype=image/svg+xml" }
      ]
    }
};
