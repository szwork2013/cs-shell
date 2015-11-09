
/**
 * Module dependencies.
 */
var base = require("./table.base.controller");

/**
* Initializes module table list controller.
*/
module.exports = function TableListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Tables into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "TableService"];