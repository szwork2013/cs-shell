"use strict";
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-card-header.
 */
module.exports = function csCardHeader(shell, $){
	return {
		restrict		: "E",
		template		: require("./../partials/card.header.html"),
		require			: "^csCard",
		transclude		: true,
		replace			: true,
		link			: function($scope, element, attrs, card){
			// access the required parent controller
			// and store it to use in the card header template
			$scope.card = card;
	
			$(".panel-heading").hover(function() {
				$(this).find(".btn-toolbar").fadeIn(250);
			}, function() {
				$(this).find(".btn-toolbar").fadeOut(205);
			});
		}
	}
}
module.exports.$inject = ["Shell", "$"];