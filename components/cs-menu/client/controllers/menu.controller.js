/**
 * initializes angular controller cs.menu.controller.
 */
module.exports = function menuController($scope, menuService, $rootScope){
    var menu = this;
    
    menu.setActiveItem = function(element){
        menu.element = element;
    }
    
    menu.setRoute = function(route){
        $rootScope.$broadcast("cs:menu:item:selected:event", {route: route});
    }
}
module.exports.$inject = ["$scope", "MenuService", "$rootScope"];