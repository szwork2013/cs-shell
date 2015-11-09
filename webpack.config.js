var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ComponentPlugin = require("component-webpack-plugin");
var config = require("components/config");

var webpackConfig = {  
    devtool: "eval-source-map",
      entry: [
        "webpack-hot-middleware/client?reload=true",
        path.join(config.paths.base, config.files.entry)
      ],
      output: {
        path: config.paths.www,
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
          template: config.files.template,
          inject: "body",
          filename: config.files.index
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
          loaders: ["style", "css", "sass","jsontosass?" + config.sass.vars]
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
  }
 
  module.exports = webpackConfig;