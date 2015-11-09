
/**
 * Initializes angular module cs-field-routes.
 */
module.exports = function fieldRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.field", {
			abstract: true,
			url: "/field",
			template: "<div ui-view></div>"
		})
		.state("cs.field.page", {
			url: "/page",
			template: require("./../partials/field.page.html"),
			controller: "FieldPageController",
			data: { pageTitle: "Field" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];