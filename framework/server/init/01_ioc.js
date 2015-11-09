/**
 * Module dependencies.
 * 
 * electrolyte  : https://github.com/jaredhanson/electrolyte
 */
var ioc = require("electrolyte");
var path = require("path");

/**
 * Initialize IoC container.
 */
module.exports = function(app, config, logger, next){
  //
  //
  //
  var components = path.resolve("components");
  //
  //
  //
  ioc.use(ioc.node(components));
  //
  //
  //
  
  console.log("App / Booting - 01 - IoC");
  next();
}