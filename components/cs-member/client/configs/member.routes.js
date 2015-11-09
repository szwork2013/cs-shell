
/**
 * Initializes angular module cs-member-routes.
 */
module.exports = function memberRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.member", {
			abstract: true,
			url: "/member",
			template: "<div ui-view></div>"
		})
		.state("cs.member.page", {
			url: "/page",
			template: require("./../partials/member.page.html"),
			controller: "MemberPageController",
			data: { pageTitle: "Member" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];