
/**
 * Initializes angular module cs-field-routes.
 */
module.exports = function fieldRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.field", {
			abstract: true,
			url: "/field",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.field.page", {
			url: "/page",
			template: require("./../partials/field.page.html"),
			controller: "FieldPageController",
			data: { pageTitle: "Field" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];