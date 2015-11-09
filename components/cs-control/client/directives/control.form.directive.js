
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-control.
 */
module.exports = function(shell, $compile){
	return {
		restrict:"E",
		scope:{},
		bindToController:true,
		controller:"ControlFormController",
		controllerAs:"vm",
		template: require("./../partials/control.form.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
