/**
 * Module dependencies.
 */
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require( "webpack-hot-middleware");

/**
 * Initialize proxy server on development.
 */
module.exports = function(app, config, logger, next){
  var base = config.paths.base + "webpack.config.js";
  var webpackConfig = require(base);
  
  /**
  * Initializes webpack in development.
  */
  if(config.isProduction) return;

  /**
  * Initializes webpack compiler.
  */
  var compiler = webpack(webpackConfig);

  /**
  * Wires webpack compiler to the express application.
  */
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
      contentBase: "src",
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }
  ));

  /**
  * Wires webpack hot module loader.
  */
  app.use(webpackHotMiddleware(compiler));
}