"use strict";
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-card-content.
 */
module.exports = function csCardContent(shell, $){
	var templates = {
		content: [
			"    <div class=\"panel-body card-body\" ng-transclude>",
			"    </div>"
		].join(""),
		list: [
			"    <ul class=\"list-group card-body\" ng-transclude>",
			"    </ul>"
		].join("")
	}
	return {
		restrict		: "E",
		template		: function(element, attrs) {
			if (attrs.contentType && attrs.contentType === "list") {
				return templates.list;
			} else {
				return templates.content;
			}
		},
		controller		: ["$scope", function($scope) {
			var content = this;
			content.groups = [];
		}],
		controllerAs	: "content",
		bindToController: true,
		scope			: {
			contentGroups: "=groups",
			contentType: "=type"
		},
		transclude		: true,
		replace			: true,
		require			: "^csCard",
		link			: function($scope, element, attrs, card){
			// access the required parent controller
			// and store it to use in the card header template
			$scope.card = card;
		}
	}
}
module.exports.$inject = ["Shell", "$"];