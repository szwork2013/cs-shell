/**
 * initializes angular module cs-app-ctrl.
 */
module.exports = function appController($scope, appService, $rootScope){
    var app = this;    
	app.service = appService;	
	app.userName = "Example user";
	app.helloText = "Welcome in INSPINIA Gulp SeedProject";
	app.descriptionText = "It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.";		
	$scope.$on("cs:menu:item:selected:event", function(events, data){		
		app.routeString = data.route;
	});
}
module.exports.$inject = ["$scope","AppService","$rootScope"];