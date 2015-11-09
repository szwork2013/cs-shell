
/**
 * Initializes angular module cs-strip-routes.
 */
module.exports = function stripRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.strip", {
			abstract: true,
			url: "/strip",
			template: "<div ui-view></div>"
		})
		.state("cs.strip.page", {
			url: "/page",
			template: require("./../partials/strip.page.html"),
			controller: "StripPageController",
			data: { pageTitle: "Strip" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];