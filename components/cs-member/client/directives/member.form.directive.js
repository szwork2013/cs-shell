
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-member.
 */
module.exports = function(shell, $compile){
	return {
		restrict:"E",
		scope:{},
		bindToController:true,
		controller:"MemberFormController",
		controllerAs:"vm",
		template: require("./../partials/member.form.html"),
		link:function($scope, element, attrs){}
	}
}
module.exports.$inject = ["Shell", "$compile"];
