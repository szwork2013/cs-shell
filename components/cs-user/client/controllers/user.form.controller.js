
/**
 * Module dependencies.
 */
var base = require("./user.base.controller");

/**
* Initializes module User controller.
*/
module.exports = function userController($scope, shell, service){
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
        key: "email",
        type: "input",
        templateOptions:
        {
            type: "email",
            label: "Email",
            placeholder:"Enter email"
        }
    },
    {
        key: "password",
        type: "input",
        templateOptions:
        {
            type: "password",
            label: "Password",
            placeholder:"Enter password"
        }
    },
    {
        key: "file",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "File",
            placeholder:"Enter file"
        }
    },
    {
        key: "dob",
        type: "input",
        templateOptions:
        {
            type: "datetime",
            label: "Dob",
            placeholder:"Enter dob"
        }
    },
    {
        key: "city",
        type: "input",
        templateOptions:
        {
            type: "text",
            label: "City",
            placeholder:"Enter city"
        }
    },
	]
}
module.exports.$inject = ["$scope", "Shell", "UserService"]