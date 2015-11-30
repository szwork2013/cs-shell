/**
 * defines angular module cs-card dependencies.
 */
require("./styles/card.scss");

/**
 * configures angular module cs-card.
 */
module.exports = function csCard(angular){
    var card = angular.module("cs.card", []);
		card.controller("CardController", require("./controllers/card.controller"));
		card.service("CardService", require("./services/card.service"));
        card.directive("csCard", require("./directives/card.directive"));		
		card.directive("csCardHeader", require("./directives/card.header.directive"));
		card.directive("csCardContent", require("./directives/card.content.directive"));
		card.directive("csCardFooter", require("./directives/card.footer.directive"));
		card.directive("csCardGroup", require("./directives/card.group.directive"));
    return card;
}