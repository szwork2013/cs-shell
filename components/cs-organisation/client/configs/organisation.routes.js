
/**
 * Initializes angular module cs-organisation-routes.
 */
module.exports = function organisationRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.organisation", {
			abstract: true,
			url: "/organisation",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.organisation.page", {
			url: "/page",
			template: require("./../partials/organisation.page.html"),
			controller: "OrganisationPageController",
			data: { pageTitle: "Organisation" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];