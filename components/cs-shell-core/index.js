/**
 * Module dependencies.
 * 
 * postal		: https://www.npmjs.com/package/postal
 */
var postal = require("postal");
var angular = require("angular");
var uuid = require("uuid");
var _ = require("lodash");

/**
 * initializes angular module cs-organisation.
 */
module.exports = require("./client/shell.module")(angular, postal, uuid, _);