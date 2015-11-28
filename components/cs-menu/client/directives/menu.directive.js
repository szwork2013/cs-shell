/**
 * initializes angular directive cs.menu.directive.
 */
module.exports = function menu(){
	return {
		restrict		: "E",
		transclude		: true,
		replace			: true,
		template		: require("./../partials/menu.html"),
		controller		: "MenuController",
		controllerAs	: "menu",
		bindToController: true,
		scope			: {},
		link			: function($scope, element, attrs){}
	}
}