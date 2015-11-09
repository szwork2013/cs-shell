
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
		controller:"OrganisationListController",
		controllerAs:"vm",
		template: require("./../partials/organisation.list.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
