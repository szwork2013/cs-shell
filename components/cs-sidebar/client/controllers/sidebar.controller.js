/**
 * initializes angular controller cs.app.sidebar.controller.
 */
module.exports = function sidebarCtrl($scope, sidebarService, $rootScope, $window, $){
    
    var sidebar = this;
    sidebar.isMenuShown = true;
    
    sidebar.setActiveItem = function(element){
        sidebar.element = element;
    }
    
    sidebar.setRoute = function(route){
        $rootScope.$broadcast("cs:menu:item:selected:event", {route: route});
    }
    
    $scope.$on("cs:menu:show:event", function(event, data){
        sidebar.isMenuShown = data.isMenuShown;
    });
    
    $($window).on("resize", function(){
		if($window.innerWidth<760  && sidebar.isMenuShown ){
			sidebar.isMenuShown = false;
            $scope.$apply();
		}
        if($window.innerWidth>760  && !sidebar.isMenuShown ){
			sidebar.isMenuShown = true;
            $scope.$apply();
		}
	})
    
}
module.exports.$inject = ["$scope", "SidebarService", "$rootScope","$window", "$"];