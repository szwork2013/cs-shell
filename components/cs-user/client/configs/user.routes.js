
/**
 * Initializes angular module cs-user-routes.
 */
module.exports = function userRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.admin.user", {
			abstract: true,
			url: "/user",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.admin.user.page", {
			url: "/page",
			template: require("./../partials/user.page.html"),
			controller: "UserPageController",
			data: { pageTitle: "User" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];