
/**
 * defines angular module cs-user dependencies.
 */
require("./styles/user.scss");

/**
* configures angular module cs-user.
*/
module.exports = function csUser(angular){
    var user = angular.module("cs.user", []);
    user.config(require("./configs/user.routes"));
    user.run(require("./configs/user.run"));

    user.controller("UserCardController", require("./controllers/user.card.controller"));
    user.controller("UserListController", require("./controllers/user.list.controller"));
    user.controller("UserGridController", require("./controllers/user.grid.controller"));
    user.controller("UserFormController", require("./controllers/user.form.controller"));
    user.controller("UserPageController", require("./controllers/user.page.controller"));

    user.directive("csUserCard", require("./directives/user.card.directive"));
    user.directive("csUserList", require("./directives/user.list.directive"));
    user.directive("csUserGrid", require("./directives/user.grid.directive"));
    user.directive("csUserForm", require("./directives/user.form.directive"));

    user.service("UserService", require("./services/user.service"));
    user.factory("User", require("./services/user"));

    return user;
}