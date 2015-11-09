
/**
 * Module dependencies.
 */
var base = require("./member.base.controller");

/**
* Initializes module Member page controller.
*/
module.exports = function memberPageController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
}
module.exports.$inject = ["$scope", "Shell", "MemberService"]