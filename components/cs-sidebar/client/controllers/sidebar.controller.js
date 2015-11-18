/**
 * initializes angular controller cs.app.sidebar.controller.
 */
module.exports = function sidebarCtrl($scope, sidebarService, $rootScope, $window, $){
    
    var sidebar = this;
    sidebar.isMenuShown = true;
    
    sidebar.items = [
        {name: "Dashboard", icon:"fa-dashboard", state:"cs.dashboard.page"},
        {name: "Lists", icon:"fa-list", state:"cs.list.page"},
        {name: "Boards", icon:"fa-share-alt", state:"cs.board.page"},
        {name: "Stars", icon:"fa-star", state:"cs.star.page"},
        {name: "Tables", icon:"fa-table", state:"cs.table.page"},
        {name: "Strips", icon:"fa-bars", state:"cs.strip.page"},
        {name: "Users", icon:"fa-user", state:"cs.user.page"},
        {name: "Controls", icon:"fa-sliders", state:"cs.control.page"},
        {name: "Members", icon:"fa-users", state:"cs.member.page"},
        {name: "Organisations", icon:"fa-group", state:"cs.organisation.page"}        
    ];
        
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