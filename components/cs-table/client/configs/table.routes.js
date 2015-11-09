
/**
 * Initializes angular module cs-table-routes.
 */
module.exports = function tableRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.table", {
			abstract: true,
			url: "/table",
			template: "<div ui-view></div>"
		})
		.state("cs.table.page", {
			url: "/page",
			template: require("./../partials/table.page.html"),
			controller: "TablePageController",
			data: { pageTitle: "Table" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];