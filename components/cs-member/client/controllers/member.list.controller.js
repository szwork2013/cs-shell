
/**
 * Module dependencies.
 */
var base = require("./member.base.controller");

/**
* Initializes module member list controller.
*/
module.exports = function MemberListController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	/**
	* loads all the Members into the shell;
	*/
	vm.refresh();
}
module.exports.$inject = ["$scope","Shell", "MemberService"];