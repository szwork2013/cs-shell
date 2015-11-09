
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-user.
 */
module.exports = function(shell, $compile){
	return {
        restrict:"E",
        scope:{},
		bindToController:true,
		controller:"UserListController",
		controllerAs:"vm",
		template: require("./../partials/user.list.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
