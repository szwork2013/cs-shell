/**
 * Module dependencies.
 * 
 * bootable	: https://www.npmjs.com/package/app-boot
 * morgan   : https://www.npmjs.com/package/morgan
 */
var dir = require("node-dir");
var bootable = require("app-boot");
var async = require("async");
var config = require("components/config");
var path = require("path");
var logger = require("morgan");
var express = require("express"),
    app = express();
    app.use(logger("dev"));
     
/**
 * Initializes a bootable Express application.
 */
var boot = bootable(app, config, logger);

/**
* Configures boot start and error handler;
*/
function start(){
    boot(function ( error ) {
        if ( error ) {
            throw error;
        }
        console.log("App / Booting - Complete");
    });
}

/**
 * Configures environment-specific settings;
 */
boot.phase(require("./init/00_config"));

/**
 * Configures IoC;
 */
boot.phase(require("./init/01_ioc"));

/**
 * Configures Express application;
 */
boot.phase(require("./init/02_express"));

/**
 * Configures database;
 */
boot.phase(require("./init/03_database"));

/**
 * Configures views;
 */
boot.phase(require("./init/04_views"));

/**
 * Configures webpack;
 */
boot.phase(require("./init/05_webpack"));

/**
 * Configures apis;
 */
async.each(require(config.paths.components), function(api, done){
    /**
    * Bootstraps api routes to boot phase;
    */
    boot.phase(api);
    done();
}); 

/**
 * Configures routes;
 */
boot.phase(require("./init/07_routes"));

/**
 * Starts the boot phases;
 */
start(); 
       
/**
 * Expose application.
 */
module.exports = app;