"use strict";
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-strip.
 */
module.exports = function(shell, $compile){
	return {
		restrict:"E",
		scope:{},
		bindToController:true,
		controller:"StripCardController",
		controllerAs:"vm",
		template: require("./../partials/strip.card.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
