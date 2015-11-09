
/**
 * Initializes angular module cs-control-routes.
 */
module.exports = function controlRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.control", {
			abstract: true,
			url: "/control",
			template: "<div ui-view></div>"
		})
		.state("cs.control.page", {
			url: "/page",
			template: require("./../partials/control.page.html"),
			controller: "ControlPageController",
			data: { pageTitle: "Control" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];