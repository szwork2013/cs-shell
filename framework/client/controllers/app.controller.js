/**
 * initializes angular module cs-app-ctrl.
 */
module.exports = function appController($scope, appService, $rootScope){
    var app = this;    
	app.service = appService;
	
	$scope.$on("cs:menu:item:selected:event", function(events, data){		
		app.routeString = data.route;
	});
}
module.exports.$inject = ["$scope","AppService","$rootScope"];