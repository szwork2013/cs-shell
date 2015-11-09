
/**
 * defines angular module cs-strip dependencies.
 */
require("./styles/strip.scss");

/**
* configures angular module cs-strip.
*/
module.exports = function csStrip(angular){
    var strip = angular.module("cs.strip", []);
    strip.config(require("./configs/strip.routes"));
    strip.run(require("./configs/strip.run"));

    strip.controller("StripCardController", require("./controllers/strip.card.controller"));
    strip.controller("StripListController", require("./controllers/strip.list.controller"));
    strip.controller("StripGridController", require("./controllers/strip.grid.controller"));
    strip.controller("StripFormController", require("./controllers/strip.form.controller"));
    strip.controller("StripPageController", require("./controllers/strip.page.controller"));

    strip.directive("csStripCard", require("./directives/strip.card.directive"));
    strip.directive("csStripList", require("./directives/strip.list.directive"));
    strip.directive("csStripGrid", require("./directives/strip.grid.directive"));
    strip.directive("csStripForm", require("./directives/strip.form.directive"));

    strip.service("StripService", require("./services/strip.service"));
    strip.factory("Strip", require("./services/strip"));

    return strip;
}