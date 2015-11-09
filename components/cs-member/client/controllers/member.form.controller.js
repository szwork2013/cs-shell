
/**
 * Module dependencies.
 */
var base = require("./member.base.controller");

/**
* Initializes module Member controller.
*/
module.exports = function memberController($scope, shell, service){
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
        key: "userId",
        type: "select",
        templateOptions:
        {
            type: "vm.userId",
            label: "User id",
            placeholder:"Enter user id"
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
    {
        key: "organisationId",
        type: "select",
        templateOptions:
        {
            type: "vm.organisationId",
            label: "Organisation id",
            placeholder:"Enter organisation id"
        }
    },
    {
        key: "privileges",
        type: "input",
        templateOptions:
        {
            type: "number",
            label: "Privileges",
            placeholder:"Enter privileges"
        }
    },
    {
        key: "state",
        type: "input",
        templateOptions:
        {
            type: "checkbox",
            label: "State",
            placeholder:"Enter state"
        }
    },
	]
}
module.exports.$inject = ["$scope", "Shell", "MemberService"]