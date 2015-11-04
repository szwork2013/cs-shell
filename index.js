/**
 * initializes global variables.
 */
var $ = require("jquery"); 
var angular = require("angular");
var _ = require("lodash");
var config = require("./components/config");

/**
 * initializes angular modules and dependencies.
 */
require("ag-grid");
require("!style!css!" + "./node_modules/ag-grid/dist/ag-grid.css");
require("!style!css!" + "./node_modules/ag-grid/dist/theme-fresh.css");

/**
 * initializes angular module cs-app.
 */
require("./framework/client/app-module")($,angular,_);