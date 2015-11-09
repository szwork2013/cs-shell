
/**
 * defines angular module cs-table dependencies.
 */
require("./styles/table.scss");

/**
* configures angular module cs-table.
*/
module.exports = function csTable(angular){
    var table = angular.module("cs.table", []);
    table.config(require("./configs/table.routes"));
    table.run(require("./configs/table.run"));

    table.controller("TableCardController", require("./controllers/table.card.controller"));
    table.controller("TableListController", require("./controllers/table.list.controller"));
    table.controller("TableGridController", require("./controllers/table.grid.controller"));
    table.controller("TableFormController", require("./controllers/table.form.controller"));
    table.controller("TablePageController", require("./controllers/table.page.controller"));

    table.directive("csTableCard", require("./directives/table.card.directive"));
    table.directive("csTableList", require("./directives/table.list.directive"));
    table.directive("csTableGrid", require("./directives/table.grid.directive"));
    table.directive("csTableForm", require("./directives/table.form.directive"));

    table.service("TableService", require("./services/table.service"));
    table.factory("Table", require("./services/table"));

    return table;
}