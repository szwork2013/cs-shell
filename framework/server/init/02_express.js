/**
 * Module dependencies.
 * 
 * urlencoded     : https://www.npmjs.com/package/urlencoded-request-parser
 * json           : https://www.npmjs.com/package/express-json
 * errorHandler   : https://www.npmjs.com/package/express-error-handler
 */
var urlencoded = require("urlencoded-request-parser");
var json = require("express-json");
var errorHandler = require("express-error-handler");
var path = require("path");
var express = require("express");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");

/**
 * Initialize middleware.
 */
module.exports = function(app, config, logger, next){
  //
  app.use(logger("tiny"))
  app.use(urlencoded({extended: true}));
  app.use(json());
  app.use(errorHandler()); 
  app.use(express.static(config.paths.www));
  //   
  console.log("App / Booting - 02 - Express");
  
  next();
}