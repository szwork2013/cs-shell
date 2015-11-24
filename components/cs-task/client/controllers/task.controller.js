
/**
 * Module dependencies.
 */
var base = require("./../../../cs-strip/client/controllers/strip.base.controller");

/**
* Initializes module Task controller.
*/
module.exports = function taskController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	
}
module.exports.$inject = ["$scope", "Shell", "StripService"]