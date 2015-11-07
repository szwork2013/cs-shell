/**
 * defines angular module cs-app dependencies.
 */
require("./styles/app.scss");

/**
 * configures angular module cs-app.
 */
module.exports = function appModule($,angular,_){
    var app = angular.module("cs.app", [
        "agGrid",
        require("angular-ui-router"),
        require("components/cs-header").name, 
        require("components/cs-login").name,
        require("components/cs-sidebar").name,
        require("components/cs-footer").name        
    ]);
    app.config(require("./configs/app.config"));
    app.controller("AppController", require("./controllers/app.controller"));
    app.directive("csApp", require("./directives/app.directive"));
    app.factory("AppService", require("./services/app.service"));
    app.value("$", $);
    app.value("_", _);
    return app;
}

/**
 * annotates angular module cs-app for InnerStructure IoC.
 */
module.exports.$inject = ["$","angular","_"];