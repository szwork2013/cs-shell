
/**
 * Module dependencies.
 */
var base = require("./organisation.base.controller");

/**
* Initializes module Organisation controller.
*/
module.exports = function organisationController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	
}
module.exports.$inject = ["$scope", "Shell", "OrganisationService"]