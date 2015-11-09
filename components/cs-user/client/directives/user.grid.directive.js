
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-user.
 */
module.exports = function(shell, $compile){
	return {
        restrict:"E",
        scope:{},
		bindToController:true,
		controller:"UserGridController",
		controllerAs:"vm",
		template: require("./../partials/user.grid.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];