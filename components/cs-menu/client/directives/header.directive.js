/**
 * initializes angular directive cs.app.header.directive.
 */
module.exports = function header(){
	return {
		restrict		: "E",
		template		: require("./../partials/header.html"),
		controller		: "HeaderController",
		controllerAs	: "header",
		bindToController: true,
		scope			: {},
		link			: function($scope, element, attrs){}
	}
}