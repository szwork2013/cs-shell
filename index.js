/**
 * initializes globals.
 */

/**
 * initializes global variables.
 */
var $ = require("jquery"); 
var angular = require("angular");
var _ = require("lodash");

/**
 * initializes angular modules and dependencies.
 */
require("ag-grid");
require("!style!css!./node_modules/ag-grid/dist/ag-grid.css");
require("!style!css!./node_modules/ag-grid/dist/theme-fresh.css");

require("angular-ui-router")

/**
 * initializes angular module cs-app.
 */
module.exports = require("./component/client/app-module.js")($,angular,_);