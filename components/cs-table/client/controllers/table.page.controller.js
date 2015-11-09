
/**
 * Module dependencies.
 */
var base = require("./table.base.controller");

/**
* Initializes module Table page controller.
*/
module.exports = function tablePageController ($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);
}
module.exports.$inject = ["$scope", "Shell", "TableService"]