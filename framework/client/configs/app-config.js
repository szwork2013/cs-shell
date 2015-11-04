/**
 * initializes angular module cs-app-config.
 */
module.exports = function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("cs", {
            url: "/",
            template: require("./../partials/app-content.html"),
            controller: "AppCtrl",
            controllerAs: "app"
        });
    $urlRouterProvider.otherwise("/");
  }
  module.exports.$inject = ["$stateProvider","$urlRouterProvider"];
