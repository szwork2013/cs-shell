
/**
 * Module dependencies.
 */
var base = require("./control.base.controller");

/**
* Initializes module Control controller.
*/
module.exports = function controlController($scope, shell, service){
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
        key: "extra1",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "Extra 1",
            placeholder:"Enter extra 1"
        }
    },
    {
        key: "extra2",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "Extra 2",
            placeholder:"Enter extra 2"
        }
    },
	]
}
module.exports.$inject = ["$scope", "Shell", "ControlService"]