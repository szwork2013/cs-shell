
/**
 * Module dependencies.
 */
var base = require("./user.base.controller");

/**
* Initializes module User page controller.
*/
module.exports = function userPageController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
}
module.exports.$inject = ["$scope", "Shell", "UserService"]