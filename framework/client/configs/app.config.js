/**
 * initializes angular module cs-app-config.
 */
module.exports = function appConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/admin/dashboard");
    $stateProvider
        .state("cs", {
            url: "/index",
            template: require("./../partials/app.index.html")
        });
  }
  module.exports.$inject = ["$stateProvider","$urlRouterProvider"];
