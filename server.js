/* eslint no-console: 0 */
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require( "webpack-hot-middleware");
var config = require("./webpack.config.js");

var isDeveloping = process.env.NODE_ENV !== "production";
var port = isDeveloping ? 3000 : process.env.PORT;
var app = express();

app.use(express.static(__dirname + "/public"));

if (isDeveloping) {
  var compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.get("*", function response(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, "localhost", function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
