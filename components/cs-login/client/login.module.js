/**
 * defines angular module cs-app dependencies.
 */
require("./styles/login.scss");

/**
 * configures angular module cs-login.
 */
module.exports = function appLogin(angular){
    var login = angular.module("cs.app.login", []);
		login.controller("LoginController", require("./controllers/login.controller"));
		login.service("LoginService", require("./services/login.service"));
        login.directive("csAppLogin", require("./directives/login.directive"));
    return login;
}