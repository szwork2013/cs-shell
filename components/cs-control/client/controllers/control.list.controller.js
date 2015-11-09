
/**
 * Module dependencies.
 */
var base = require("./control.base.controller");

/**
* Initializes module control list controller.
*/
module.exports = function ControlListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Controls into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "ControlService"];