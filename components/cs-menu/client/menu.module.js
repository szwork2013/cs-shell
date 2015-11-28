/**
 * defines angular module cs-app dependencies.
 */
require("./styles/menu.scss");

/**
 * configures angular module cs-menu.
 */
module.exports = function appMenu(angular){
    var menu = angular.module("cs.menu", []);
		menu.controller("MenuController", require("./controllers/menu.controller"));
		menu.service("MenuService", require("./services/menu.service"));
        menu.directive("csMenu", require("./directives/menu.directive"));
		menu.directive("csMenuItem", require("./directives/menu.item.directive"));
    return menu;
}