var webpack = require("webpack");
var ComponentPlugin = require("component-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: "./index.js",
    output: {
        path: __dirname + '/public',
        filename: "index.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]" },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        },
        new ComponentPlugin())
    ]
};