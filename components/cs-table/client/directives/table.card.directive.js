
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-table.
 */
module.exports = function(shell, $compile){
	return {
		restrict:"E",
		scope:{},
		bindToController:true,
		controller:"TableCardController",
		controllerAs:"vm",
		template: require("./../partials/table.card.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
