/**
 * defines angular module cs-app dependencies.
 */
require("./styles/header.scss");

/**
 * configures angular module cs-header.
 */
module.exports = function appHeader(angular){
    var header = angular.module("cs.app.header", []);
		header.controller("HeaderController", require("./controllers/header.controller"));
		header.service("HeaderService", require("./services/header.service"));
        header.directive("csAppHeader", require("./directives/header.directive"));
    return header;
}