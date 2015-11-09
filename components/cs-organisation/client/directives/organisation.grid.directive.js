
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-organisation.
 */
module.exports = function(shell, $compile){
	return {
        restrict:"E",
        scope:{},
		bindToController:true,
		controller:"OrganisationGridController",
		controllerAs:"vm",
		template: require("./../partials/organisation.grid.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];