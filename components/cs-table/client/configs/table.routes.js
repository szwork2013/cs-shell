
/**
 * Initializes angular module cs-table-routes.
 */
module.exports = function tableRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.table", {
			abstract: true,
			url: "/table",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.table.page", {
			url: "/page",
			template: require("./../partials/table.page.html"),
			controller: "TablePageController",
			data: { pageTitle: "Table" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];