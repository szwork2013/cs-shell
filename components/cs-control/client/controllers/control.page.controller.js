
/**
 * Module dependencies.
 */
var base = require("./control.base.controller");

/**
* Initializes module Control page controller.
*/
module.exports = function controlPageController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
}
module.exports.$inject = ["$scope", "Shell", "ControlService"]