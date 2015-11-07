/**
 * initializes angular controller cs.app.header.controller.
 */
module.exports = function headerController($scope, headerService, $rootScope){
	
    var header = this;
	header.service = headerService;
	
	header.menuShow = function(){
		header.isMenuShown = !header.isMenuShown;
		broadcastMenuState();
		$scope.$apply();
	}
	
	var broadcastMenuState = function(){
		$rootScope.$broadcast("cs:menu:show:event", {isMenuShown: header.isMenuShown});
	}
	
}
module.exports.$inject = ["$scope", "HeaderService", "$rootScope"];