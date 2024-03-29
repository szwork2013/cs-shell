/**
 * defines angular module cs-app dependencies.
 */
require("./styles/app.scss");
//require("!style!css!sass!./styles/inspinia.scss");

/**
 * configures angular module cs-app.
 */
module.exports = function appModule($,angular,_, config){
    var app = angular.module("cs.app", [
        "agGrid",
        "ngScrollbar",
        "ui.sortable",
		require("angular-aria"),
		require("angular-animate"),
		require("angular-cookies"),
		require("angular-sanitize"),
		
		require("angular-resource"), 	
		require("angular-translate"),
		require("angular-touch"), 
        require("angular-formly"),
        require("angular-formly-templates-bootstrap"),
        
        require("angular-ui-bootstrap"),
        require("angular-ui-router"),
        require("angular-gridster").name,
        
        require("components/cs-admin-page").name, 
        require("components/cs-card").name, 
        require("components/cs-card-feed").name, 
        require("components/cs-control").name,       
        require("components/cs-field").name,
        require("components/cs-footer").name, 
        require("components/cs-header").name, 
        require("components/cs-login").name,
        require("components/cs-market").name,  
        require("components/cs-member").name,
        require("components/cs-menu").name,
        require("components/cs-organisation").name,        
        require("components/cs-shell-core").name,  
        require("components/cs-sidebar").name,  
        require("components/cs-strip").name,
        require("components/cs-table").name,
        require("components/cs-user").name,
        require("components/cs-task").name                   
    ]);
    app.config(require("./configs/app.config"));
    app.run(require("./configs/app.run"));
    app.controller("AppController", require("./controllers/app.controller"));
    app.directive("csApp", require("./directives/app.directive"));
	app.directive("icheck", require("./directives/icheck.directive"));
    app.directive("csTransclude", require("./directives/transclude.directive"));
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