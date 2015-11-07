/**
 * initializes angular directive cs.app.login.directive.
 */
module.exports = function login(){
	return {
		restrict		: "E",
		template		: require("./../partials/login.html"),
		controller		: "LoginController",
		controllerAs	: "login",
		bindToController: true,
		scope			: {},
		link			: function($scope, element, attrs){}
	}
}