"use strict";
var angular = require("angular");
/**
* Initializes module admin page controller.
*/
module.exports = function AdminPageController($scope, $rootScope, $cookieStore, $window) {
    
    var admin = this;
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    admin.getWidth = function() {
        return $window.innerWidth;
    };

    $scope.$watch(admin.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get("toggle"))) {
                admin.toggle = ! $cookieStore.get("toggle") ? false : true;
            } else {
                admin.toggle = true;
            }
        } else {
            admin.toggle = false;
        }
    });

    admin.toggleSidebar = function() {
        admin.toggle = !admin.toggle;
        $cookieStore.put("toggle", admin.toggle);
    };

    $window.onresize = function() {
        $scope.$apply();
    };
    
    $scope.$on("cs:sidebar:toggle:changed:event", function(event, data){
        admin.toggle = data.toggle;
        console.log("cs:sidebar:toggle:changed:" + data.toggle + ":event:received");
    });
}
module.exports.$inject = ["$scope", "$rootScope", "$cookieStore", "$window"];