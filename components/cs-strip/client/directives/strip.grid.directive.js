
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
		controller:"StripGridController",
		controllerAs:"vm",
		template: require("./../partials/strip.grid.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];