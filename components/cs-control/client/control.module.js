
/**
 * defines angular module cs-control dependencies.
 */
require("./styles/control.scss");

/**
* configures angular module cs-control.
*/
module.exports = function csControl(angular){
    var control = angular.module("cs.control", []);
    control.config(require("./configs/control.routes"));
    control.run(require("./configs/control.run"));

    control.controller("ControlCardController", require("./controllers/control.card.controller"));
    control.controller("ControlListController", require("./controllers/control.list.controller"));
    control.controller("ControlGridController", require("./controllers/control.grid.controller"));
    control.controller("ControlFormController", require("./controllers/control.form.controller"));
    control.controller("ControlPageController", require("./controllers/control.page.controller"));

    control.directive("csControlCard", require("./directives/control.card.directive"));
    control.directive("csControlList", require("./directives/control.list.directive"));
    control.directive("csControlGrid", require("./directives/control.grid.directive"));
    control.directive("csControlForm", require("./directives/control.form.directive"));

    control.service("ControlService", require("./services/control.service"));
    control.factory("Control", require("./services/control"));

    return control;
}