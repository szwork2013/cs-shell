
/**
 * Module dependencies.
 */
var base = require("./field.base.controller");

/**
* Initializes module field list controller.
*/
module.exports = function FieldListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Fields into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "FieldService"];