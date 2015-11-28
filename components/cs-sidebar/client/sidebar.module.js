/**
 * defines angular module cs-app dependencies.
 */
require("./styles/sidebar.scss");

/**
 * configures angular module cs-sidebar.
 */
module.exports = function appSidebar(angular){
    var sidebar = angular.module("cs.app.sidebar", []);
		sidebar.controller("SidebarController", require("./controllers/sidebar.controller"));
		sidebar.service("SidebarService", require("./services/sidebar.service"));
        sidebar.directive("csAppSidebar", require("./directives/sidebar.directive"));
    return sidebar;
}