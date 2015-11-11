
/**
 * Initializes angular module cs-member-routes.
 */
module.exports = function memberRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.member", {
			abstract: true,
			url: "/member",
			template: "<cs-page-layout ui-view></cs-page-layout>"
		})
		.state("cs.member.page", {
			url: "/page",
			template: require("./../partials/member.page.html"),
			controller: "MemberPageController",
			data: { pageTitle: "Member" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];