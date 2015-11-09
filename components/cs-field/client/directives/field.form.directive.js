
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
		controller:"FieldFormController",
		controllerAs:"vm",
		template: require("./../partials/field.form.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
