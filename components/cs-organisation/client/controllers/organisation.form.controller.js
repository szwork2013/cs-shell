
/**
 * Module dependencies.
 */
var base = require("./organisation.base.controller");

/**
* Initializes module Organisation controller.
*/
module.exports = function organisationController($scope, shell, service){
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
	]
}
module.exports.$inject = ["$scope", "Shell", "OrganisationService"]