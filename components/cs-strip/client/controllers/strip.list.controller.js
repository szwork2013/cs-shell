
/**
 * Module dependencies.
 */
var base = require("./strip.base.controller");

/**
* Initializes module strip list controller.
*/
module.exports = function StripListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Strips into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "StripService"];