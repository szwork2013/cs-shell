
/**
 * Module dependencies.
 */
var base = require("./strip.base.controller");

/**
* Initializes module Strip controller.
*/
module.exports = function stripController($scope, shell, service){
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
        key: "controlId",
        type: "select",
        templateOptions:
        {
            type: "vm.controlId",
            label: "Control id",
            placeholder:"Enter control id"
        }
    },
    {
        key: "parentId",
        type: "select",
        templateOptions:
        {
            type: "vm.parentId",
            label: "Parent id",
            placeholder:"Enter parent id"
        }
    },
	]
}
module.exports.$inject = ["$scope", "Shell", "StripService"]