
/**
 * Module dependencies.
 */
var base = require("./field.base.controller");

/**
* Initializes module Field controller.
*/
module.exports = function fieldController($scope, shell, service){
	// sets the viewmodel variables;
	var vm = base(this, shell, service);

	vm.fields = [
    {
        key: "id",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "Id",
            placeholder:"Enter id"
        }
    },
    {
        key: "name",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "Name",
            placeholder:"Enter name"
        }
    },
    {
        key: "isActive",
        type: "input",
        templateOptions:
        {
            type: "checkbox",
            label: "Is active",
            placeholder:"Enter is active"
        }
    },
    {
        key: "type",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "Type",
            placeholder:"Enter type"
        }
    },
    {
        key: "tableId",
        type: "select",
        templateOptions:
        {
            type: "vm.tableId",
            label: "Table id",
            placeholder:"Enter table id"
        }
    },
	]
}
module.exports.$inject = ["$scope", "Shell", "FieldService"]