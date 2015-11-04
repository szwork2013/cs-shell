/**
 * defines angular module cs-app dependencies.
 */
require("./styles/app-style.scss");

/**
 * configures angular module cs-app.
 */
module.exports = function appModule($,angular,_){
    var app = angular.module("app", [
            require("angular-ui-router"),
            "agGrid",            
        ]);
        app.config(require("./configs/app-config"));
        app.controller("AppCtrl", require("./controllers/app-ctrl"));
        app.value("$", $);
        app.value("_", _);
    return app;
}

/**
 * annotates angular module cs-app for InnerStructure IoC.
 */
module.exports.$inject = ["$","angular","_"];