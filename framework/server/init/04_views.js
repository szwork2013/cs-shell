/**
 * Module dependencies.
 * ejs      : https://www.npmjs.com/package/ejs
 * ejs-mate : https://www.npmjs.com/package/ejs-mate
 */
var engine = require("ejs-mate");
var path = require("path");

/**
 * Initialize views.
 */
module.exports = function(app, config, logger, next){
  var viewspaths = [config.paths.views
                   ,config.paths.www];
  
  app.set("views", viewspaths);
  app.set("view engine", "ejs");  
  app.engine("ejs", engine);
  app.engine("html", engine);
    
  console.log("App / Booting - 04 - Mounting views");
  
  next();
}