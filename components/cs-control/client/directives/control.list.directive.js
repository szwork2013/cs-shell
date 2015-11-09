
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
		controller:"ControlListController",
		controllerAs:"vm",
		template: require("./../partials/control.list.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
