
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-field.
 */
module.exports = function(shell, $compile){
	return {
		restrict:"E",
		scope:{},
		bindToController:true,
		controller:"FieldCardController",
		controllerAs:"vm",
		template: require("./../partials/field.card.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
