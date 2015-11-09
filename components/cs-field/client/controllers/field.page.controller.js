
/**
 * Module dependencies.
 */
var base = require("./field.base.controller");

/**
* Initializes module Field page controller.
*/
module.exports = function fieldPageController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
}
module.exports.$inject = ["$scope", "Shell", "FieldService"]