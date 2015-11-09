
/**
 * Module dependencies.
 */
var base = require("./strip.base.controller");

/**
* Initializes module Strip controller.
*/
module.exports = function stripController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	
}
module.exports.$inject = ["$scope", "Shell", "StripService"]