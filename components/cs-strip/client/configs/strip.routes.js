
/**
 * Initializes angular module cs-strip-routes.
 */
module.exports = function stripRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.admin.strip", {
			abstract: true,
			url: "/strip",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.admin.strip.page", {
			url: "/page",
			template: require("./../partials/strip.page.html"),
			controller: "StripPageController",
			data: { pageTitle: "Strip" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];