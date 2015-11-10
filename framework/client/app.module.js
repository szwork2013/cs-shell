/**
 * defines angular module cs-app dependencies.
 */
require("./styles/app.scss");

/**
 * configures angular module cs-app.
 */
module.exports = function appModule($,angular,_, config){
    var app = angular.module("cs.app", [
        "agGrid",
        require("angular-ui-router"),
        require("components/cs-shell-core").name,
        
        require("components/cs-header").name, 
        require("components/cs-footer").name, 
        require("components/cs-login").name,        
        require("components/cs-sidebar").name,
        
        require("components/cs-control").name,
        require("components/cs-field").name,
        require("components/cs-table").name,
        require("components/cs-organisation").name,
        require("components/cs-member").name,
        require("components/cs-strip").name,
        require("components/cs-user").name            
    ]);
    app.config(require("./configs/app.config"));
    app.controller("AppController", require("./controllers/app.controller"));
    app.directive("csApp", require("./directives/app.directive"));
    app.factory("AppService", require("./services/app.service"));
    app.value("$", $);
    app.value("_", _);
    app.value("Api", config.api.url)
    return app;
}

/**
 * annotates angular module cs-app for InnerStructure IoC.
 */
module.exports.$inject = ["$","angular","_"];