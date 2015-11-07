/**
 * defines angular module cs-app dependencies.
 */
require("./styles/footer.scss");

/**
 * configures angular module cs-footer.
 */
module.exports = function appFooter(angular){
    var footer = angular.module("cs.app.footer", []);
		footer.controller("FooterController", require("./controllers/footer.controller"));
		footer.service("FooterService", require("./services/footer.service"));
        footer.directive("csAppFooter", require("./directives/footer.directive"));
    return footer;
}