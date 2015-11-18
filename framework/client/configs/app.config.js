/**
 * initializes angular module cs-app-config.
 */
module.exports = function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("cs", {
            url: "/index",
            template: require("./../partials/app.admin.html")
        })
        .state("cs.dashboard", {
            url: "/dashboard",
            template: require("./../partials/dashboard.html"),
            data: { pageTitle: "Dashboard" }
        })
        .state("cs.tasks", {
            url: "/tasks",
            template: require("./../partials/tasks.html"),
            data: { pageTitle: "Tasks" }
        });
        
    $urlRouterProvider.otherwise("/index/dashboard");
  }
  module.exports.$inject = ["$stateProvider","$urlRouterProvider"];
