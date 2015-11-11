
/**
 * Initializes angular module cs-control-routes.
 */
module.exports = function controlRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.control", {
			abstract: true,
			url: "/control",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.control.page", {
			url: "/page",
			template: require("./../partials/control.page.html"),
			controller: "ControlPageController",
			data: { pageTitle: "Control" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];