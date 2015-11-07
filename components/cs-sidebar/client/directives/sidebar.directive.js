/**
 * initializes angular directive cs.app.sidebar.directive.
 */
module.exports = function sidebar(){
	return {
		restrict		: "E",
		transclude		: true,
		template		: require("./../partials/sidebar.html"),
		controller		: "SidebarController",
		controllerAs	: "sidebar",
		bindToController: true,
		scope			: {},
		link			: function($scope, element, attrs){}
	}
}