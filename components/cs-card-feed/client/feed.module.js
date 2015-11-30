/**
 * defines angular module cs-card-feed dependencies.
 */
require("./styles/feed.scss");

/**
 * configures angular module cs-card-feed.
 */
module.exports = function appFeed(angular){
    var feed = angular.module("cs.card.feed", []);
		feed.controller("FeedController", require("./controllers/feed.controller"));
		feed.service("FeedService", require("./services/feed.service"));
        feed.directive("csCardFeed", require("./directives/feed.directive"));
    return feed;
}