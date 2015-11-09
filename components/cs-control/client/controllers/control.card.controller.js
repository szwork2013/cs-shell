
/**
 * Module dependencies.
 */
var base = require("./control.base.controller");

/**
* Initializes module Control controller.
*/
module.exports = function controlController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	
}
module.exports.$inject = ["$scope", "Shell", "ControlService"]