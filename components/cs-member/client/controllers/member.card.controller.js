
/**
 * Module dependencies.
 */
var base = require("./member.base.controller");

/**
* Initializes module Member controller.
*/
module.exports = function memberController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	
}
module.exports.$inject = ["$scope", "Shell", "MemberService"]