"use strict";
/**
 * Module dependencies.
 */
var angular = require("angular");

/**
 * initializes angular controller cs.app.sidebar.controller.
 */
module.exports = function sidebarController($scope, sidebarService, $rootScope, $window, $, $cookieStore){
    /**
     * Sidebar viewmodel;
     */
    var sidebar = this;
    
    /**
     * Sidebar menu items;
     */
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
    
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    sidebar.getWidth = function() {
        return $window.innerWidth;
    };

    sidebar.toggleSidebar = function() {
        sidebar.toggle = !sidebar.toggle;
        $cookieStore.put("toggle", sidebar.toggle);
        
        console.log("cs:sidebar:toggle:changed:" + sidebar.toggle + ":event:published");
        $rootScope.$broadcast("cs:sidebar:toggle:changed:event", {toggle: sidebar.toggle});        
    };

    $scope.$watch(sidebar.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get("toggle"))) {
                sidebar.toggle = ! $cookieStore.get("toggle") ? false : true;
            } else {
                sidebar.toggle = true;
            }
        } else {
            sidebar.toggle = false;
        }
    });
}
module.exports.$inject = ["$scope", "SidebarService", "$rootScope","$window", "$", "$cookieStore"];