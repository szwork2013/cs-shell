/**
 * initializes global variables.
 */
var $ = require("jquery"); 
var angular = require("angular");
var _ = require("lodash");
var config = require("components/config");

/**
 * initializes angular module ag-grid and dependencies.
 */
require("ag-grid");
require("./../node_modules/ag-grid/dist/ag-grid.css");
require("./../node_modules/ag-grid/dist/theme-fresh.css");

/**
 * initializes bootstrap
 */
require("./../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js");

/**
 * initializes angular module cs-app.
 */
require("./client/app.module")($, angular, _, config);