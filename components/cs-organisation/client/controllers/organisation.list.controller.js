
/**
 * Module dependencies.
 */
var base = require("./organisation.base.controller");

/**
* Initializes module organisation list controller.
*/
module.exports = function OrganisationListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Organisations into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "OrganisationService"];