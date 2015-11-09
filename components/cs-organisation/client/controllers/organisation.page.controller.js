
/**
 * Module dependencies.
 */
var base = require("./organisation.base.controller");

/**
* Initializes module Organisation page controller.
*/
module.exports = function organisationPageController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
}
module.exports.$inject = ["$scope", "Shell", "OrganisationService"]