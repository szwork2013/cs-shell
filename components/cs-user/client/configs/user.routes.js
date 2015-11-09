
/**
 * Initializes angular module cs-user-routes.
 */
module.exports = function userRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.user", {
			abstract: true,
			url: "/user",
			template: "<div ui-view></div>"
		})
		.state("cs.user.page", {
			url: "/page",
			template: require("./../partials/user.page.html"),
			controller: "UserPageController",
			data: { pageTitle: "User" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];