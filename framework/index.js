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
 * initializes bootstrap and dependencies.
 */
require("./../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js");
require("./../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss");

/**
 * initializes bootstrap material design.
 */
require("./../bower_components/bootstrap-material-design/scripts/material.js");
require("./../bower_components/bootstrap-material-design/scripts/ripples.js");
// require("./../bower_components/bootstrap-material-design/sass/material.scss");
// require("./../bower_components/bootstrap-material-design/sass/ripples.scss");

/**
 * initializes angular module cs-app.
 */
require("./client/app.module")($, angular, _, config);