/**
 * defines angular module cs-market dependencies.
 */
require("./styles/market.scss");

/**
 * configures angular module cs-market.
 */
module.exports = function csMarket(angular){
    var market = angular.module("cs.market", []);
		market.config(require("./config/market.routes"));
		market.controller("MarketController", require("./controllers/market.controller"));
		market.service("MarketService", require("./services/market.service"));
        market.directive("csMarket", require("./directives/market.directive"));
    return market;
}