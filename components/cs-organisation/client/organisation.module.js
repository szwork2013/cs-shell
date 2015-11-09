
/**
 * defines angular module cs-organisation dependencies.
 */
require("./styles/organisation.scss");

/**
* configures angular module cs-organisation.
*/
module.exports = function csOrganisation(angular){
    var organisation = angular.module("cs.organisation", []);
    organisation.config(require("./configs/organisation.routes"));
    organisation.run(require("./configs/organisation.run"));

    organisation.controller("OrganisationCardController", require("./controllers/organisation.card.controller"));
    organisation.controller("OrganisationListController", require("./controllers/organisation.list.controller"));
    organisation.controller("OrganisationGridController", require("./controllers/organisation.grid.controller"));
    organisation.controller("OrganisationFormController", require("./controllers/organisation.form.controller"));
    organisation.controller("OrganisationPageController", require("./controllers/organisation.page.controller"));

    organisation.directive("csOrganisationCard", require("./directives/organisation.card.directive"));
    organisation.directive("csOrganisationList", require("./directives/organisation.list.directive"));
    organisation.directive("csOrganisationGrid", require("./directives/organisation.grid.directive"));
    organisation.directive("csOrganisationForm", require("./directives/organisation.form.directive"));

    organisation.service("OrganisationService", require("./services/organisation.service"));
    organisation.factory("Organisation", require("./services/organisation"));

    return organisation;
}