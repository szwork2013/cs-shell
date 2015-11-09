
/**
 * Module dependencies.
 */
var base = require("./table.base.controller");

/**
* Initializes module Table controller.
*/
module.exports = function tableController($scope, shell, service){
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
        key: "stripId",
        type: "select",
        templateOptions:
        {
            type: "vm.parentId",
            label: "Strip id",
            placeholder:"Enter strip id"
        }
    },
	]
}
module.exports.$inject = ["$scope", "Shell", "TableService"]