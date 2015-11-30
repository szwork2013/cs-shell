/**
 * initializes angular directive cs.card.feed.directive.
 */
module.exports = function feed(shell){
	return {
		restrict		: "E",
		template		: require("../partials/feed.html"),
		controller		: "FeedController",
		controllerAs	: "feed",
		bindToController: true,
		scope			: {
			feedItems: "=items",
			feedName: "=name"
		},		
		link			: function($scope, element, attrs) {
			
			// set up add form listener:
			var addFormListener = shell.postal.subscribe({
				channel: attrs.feedName,
				topic: "add.form",
				callback: function (form, envelope) {
					$scope.feed.addForm(form);
				}
			});

			var changeStateListener = shell.postal.subscribe({
				channel: attrs.feedName,
				topic: "change.state",
				callback: function (form, envelope) {
					$scope.feed.changeState(form);
				}
			});

			$scope.$on("$destroy", function () {
				// unsubscribe show form handler:
				if (addFormListener)
					addFormListener.unsubscribe();

				if (changeStateListener)
					changeStateListener.unsubscribe();
			});
		}
	}
}
module.exports.$inject = ["Shell"];