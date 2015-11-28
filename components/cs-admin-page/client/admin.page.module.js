/**
 * defines angular module cs-admin dependencies.
 */
require("./styles/admin.page.scss");

/**
* configures angular module cs-admin.
*/
module.exports = function csControl(angular){
    var admin = angular.module("cs.admin.page", [
        // require("angular-cookies"),
        // require("angular-ui-bootstrap"),
        // require("angular-ui-router")
    ]);
    admin.config(require("./config/admin.page.routes"));

    admin.controller("AlertController", require("./controllers/alert.controller"));
    admin.controller("AdminPageController", require("./controllers/admin.page.controller"));

    admin.directive("rdLoading", require("./directives/loading.directive"));
    admin.directive("rdWidget", require("./directives/widget.directive"));
	admin.directive("rdWidgetBody", require("./directives/widget.body.directive"));
	admin.directive("rdWidgetFooter", require("./directives/widget.footer.directive"));
	admin.directive("rdWidgetHeader", require("./directives/widget.header.directive"));

    return admin;
}