"use strict";
/**
 * Initializes angular module cs-admin-routes.
 */
module.exports = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("cs.admin", {
                url: "/admin",
                template: require("./../partials/admin.page.html"),
                controller: "AdminPageController as admin"                
            })
            .state("cs.admin.dashboard", {
                url: "/dashboard",
                template: require("./../partials/dashboard.html")
            })
            .state("cs.admin.tables", {
                url: "/tables",
                template: require("./../partials/tables.html")
            });
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];