"use strict";
/**
 * initializes global variables.
 */
var angular = require("angular");

/**
 * initializes angular directive cs.app.minimalizasidebar.directive.
 */
module.exports = function minimalizaSidebar($timeout) {
	return {
		restrict: "A",
		template: "<a class='navbar-minimalize minimalize-styl-2 btn btn-primary' href='' ng-click='minimalize()'><i class='fa fa-bars'></i></a>",
		controller: ["$scope","$element", function ($scope, $element) {
			$scope.minimalize = function () {
				angular.element("body").toggleClass("mini-navbar");
				if (!angular.element("body").hasClass("mini-navbar") || angular.element("body").hasClass("body-small")) {
					// Hide menu in order to smoothly turn on when maximize menu
					angular.element("#side-menu").hide();
					// For smoothly turn on menu
					$timeout(function () {
						angular.element("#side-menu").fadeIn(500);
					}, 100);
				} else {
					// Remove all inline style from jquery fadeIn function to reset menu state
					angular.element("#side-menu").removeAttr("style");
				}
			};
		}]
	};
}
module.exports.$inject = ["$timeout"];