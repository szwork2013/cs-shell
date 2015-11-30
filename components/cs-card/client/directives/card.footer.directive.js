"use strict";
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-card-footer.
 */
module.exports = function csCardFooter(shell, $){
	return {
		restrict		: "E",
		template		: [
			"    <div class=\"panel-footer\" ng-transclude>",
			"    </div>"
			].join(""),
		transclude: true,
		replace: true,
		require			: "^csCard",
		link			:function($scope, element, attrs, card){
			// access the required parent controller
			// and store it to use in the widget header template
			$scope.card = card;
		}
	}
}
module.exports.$inject = ["Shell", "$"];