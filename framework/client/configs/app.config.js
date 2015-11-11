/**
 * initializes angular module cs-app-config.
 */
module.exports = function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("cs", {
            url: "/cs",
            template: require("./../partials/app.admin.html")
        });
    $urlRouterProvider.otherwise("/");
  }
  module.exports.$inject = ["$stateProvider","$urlRouterProvider"];
