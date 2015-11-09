
/**
 * Module dependencies.
 */
var base = require("./table.base.controller");

/**
* Initializes module Table controller.
*/
module.exports = function tableController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
	
}
module.exports.$inject = ["$scope", "Shell", "TableService"]