
/**
 * Initializes angular module cs-task-routes.
 */
module.exports = function taskRoutes($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("cs.admin.task", {
			url: "/tasks",
			template: require("./../partials/task.page.html"),
			controller: "TaskController",
			data: { pageTitle: "Tasks" }
		});
}
module.exports.$inject = ["$stateProvider","$urlRouterProvider"];