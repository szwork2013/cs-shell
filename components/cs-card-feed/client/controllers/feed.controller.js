/**
 * initializes angular controller cs.card.feed.controller.
 */
module.exports = function feedCtrl($scope, feedService, _){
    var feed = this;
    feed.items = [];
    feed.sortableOptions = {
        handle: ".panel-heading",
        stop: function(ui, e) {
            console.log("moved");
        }
    };
    feed.addForm = function (form) {
        if (feed.contains(feed.items, form)) {
            // is present check if this form is a singleton:
            if (!form.isSingleton) {
                // allowed multiple instances check id:
                if (!feed.contains(feed.items, form, "id")) {
                    // id not present add form;
                    $scope.feed.items.unshift(form);
                }
            } else {
                // form is singleton and is already present
                // but it is requested move it to the first position
                var old = _.findIndex($scope.feed.items, {name: form.name});
                // evaluates if the form has been found
                // and is not already the first entry in the array:
                if (old > 0) {
                    $scope.feed.items.move(old, 0);
                }
            }
        } else {
            // form not found add it:
            $scope.feed.items.unshift(form);
        }
    }
    feed.changeState = function (form) {
        var feedItem = null;
        if (form.isSingleton) {
            // searches one:
            feedItem = _.find(feed.items, { name: form.name });
        } else {
            // search for multiples:
            feedItem = _.find(feed.items, { name: form.name, id: form.id });
        }

        // changes feed state:
        feedItem.state = form.state;
    }
    feed.contains = function (models, data, name) {
        if (!name) name = "name";
        for (var i = 0; i < models.length; i++) {
            if (models[i][name] === data[name]) {
                return true;
            }
        }
        return false;
    }
}
module.exports.$inject = ["$scope", "FeedService", "_"];