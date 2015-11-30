"use strict";
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-card-footer.
 */
module.exports = function csCardGroup(shell, $){
	var templates = {
		headed: [
			"<li class=\"list-group-item\">",
			"	<div class=\"row\" ng-click=\"group.isCollapsed=!group.isCollapsed\">",
			"		<div class=\"col-xs-10\">",
			"			{{group.name}}",
			"		</div>",
			"		<div class=\"col-xs-2\">",
			"			<i class=\"pull-right fa color-primary\" ng-class=\"group.isCollapsed?'fa-chevron-down':'fa-chevron-up'\"></i>",
			"		</div>",
			"	</div>",
			"	<div collapse=\"group.isCollapsed\" ng-transclude></div>",
			"</li>"
		].join(""),
		normal: [
			"<li class=\"list-group-item\" ng-transclude></li>"
		].join("")
	}
	return {
		restrict		: "E",
		template		: function (element, attrs) {
			if (angular.isUndefined(attrs.group)) {
				return templates.normal;
			} else {
				return templates.headed;
			}
		},
		scope			: {
			group:"="
		},
		transclude		: true,
		replace			: true,
		link			: function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$"];