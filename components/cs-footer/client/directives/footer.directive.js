/**
 * initializes angular directive cs.app.footer.directive.
 */
module.exports = function footer(){
	return {
		restrict		: "E",
		template		: require("./../partials/footer.html"),
		controller		: "FooterController",
		controllerAs	: "footer",
		bindToController: true,
		scope			: {},
		link			: function($scope, element, attrs){}
	}
}