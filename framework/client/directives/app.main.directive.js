"use strict";
/**
 * initializes angular directive cs.app.main.directive.
 */
module.exports = function csMainHeight($, $window){
	return {
		restrict: "A",
		link: function($scope, element, attrs){
			// var windowHeight = $window.innerHeight,
			// 	headerHeight = $("#header").height(),
			// 	footerHeight = $("#footer").height();
			// $(element).css({
			// 	"height": windowHeight-(headerHeight + footerHeight),
			// });
		}
	}
}
module.exports.$inject = ["$", "$window"];