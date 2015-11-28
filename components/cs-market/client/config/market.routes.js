
/**
 * Initializes angular module cs-market-routes.
 */
module.exports = function marketRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.admin.market", {
			abstract: true,
			url: "/market",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.admin.market.page", {
			url: "/page",
			template: require("./../partials/market.page.html"),
			data: { pageTitle: "market" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];