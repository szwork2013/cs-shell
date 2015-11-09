
/**
 * Module dependencies.
 */
var base = require("./user.base.controller");

/**
* Initializes module user list controller.
*/
module.exports = function UserListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Users into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "UserService"];