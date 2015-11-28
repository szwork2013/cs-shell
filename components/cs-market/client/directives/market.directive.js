/**
 * initializes angular cs.market.directive.
 */
module.exports = function marketDirective($){
	return {
		restrict		: "E",
		template		: require("./../partials/market.html"),
		controller		: "MarketController",
		controllerAs	: "market",
		bindToController: true,
		scope			: {},
		link			: function($scope, element, attrs){
			$("#market-list").click(function(event){
				event.preventDefault();
				$("#categories-list .item").addClass("list-group-item");
			});
    		$("#market-grid").click(function(event){
				event.preventDefault();
				$("#market-items .item").removeClass("list-group-item");
				$("#market-items .item").addClass("grid-group-item");
			});
		}
	}
}
module.exports.$inject = ["$"];