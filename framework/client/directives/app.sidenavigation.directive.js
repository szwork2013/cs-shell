"use strict";
/**
 * initializes angular directive cs.app.sidenavigation.directive.
 */
module.exports = function ($timeout) {
	return {
		restrict: "A",
		link: function (scope, element) {
			// Call metsi to build when user signup
			scope.$watch("authentication.user", function() {
				$timeout(function() {
					element.metisMenu();
				});
			});

		}
	};
}
module.exports.$inject = ["$timeout"];