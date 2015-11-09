
/**
 * defines angular module cs-field dependencies.
 */
require("./styles/field.scss");

/**
* configures angular module cs-field.
*/
module.exports = function csField(angular){
    var field = angular.module("cs.field", []);
    field.config(require("./configs/field.routes"));
    field.run(require("./configs/field.run"));

    field.controller("FieldCardController", require("./controllers/field.card.controller"));
    field.controller("FieldListController", require("./controllers/field.list.controller"));
    field.controller("FieldGridController", require("./controllers/field.grid.controller"));
    field.controller("FieldFormController", require("./controllers/field.form.controller"));
    field.controller("FieldPageController", require("./controllers/field.page.controller"));

    field.directive("csFieldCard", require("./directives/field.card.directive"));
    field.directive("csFieldList", require("./directives/field.list.directive"));
    field.directive("csFieldGrid", require("./directives/field.grid.directive"));
    field.directive("csFieldForm", require("./directives/field.form.directive"));

    field.service("FieldService", require("./services/field.service"));
    field.factory("Field", require("./services/field"));

    return field;
}