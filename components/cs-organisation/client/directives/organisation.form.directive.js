
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
		controller:"OrganisationFormController",
		controllerAs:"vm",
		template: require("./../partials/organisation.form.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
