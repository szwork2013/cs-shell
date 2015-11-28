/**
 * initializes angular directive cs.app.menuItem.directive.
 */
module.exports = function menuItem(){
	return {
		restrict: "E",
		replace: true,
		require: "^csMenu",
		template: require("./../partials/menu.item.html"),
		scope: {
			label: "@",
			route:"@",
			icon: "@"
		},
		link: function($scope, element, attrs, menu){
			$scope.isActive = function(){
				return element === menu.element;
			}
			
			element.on("click", function(event){
				event.stopPropagation();
				event.preventDefault();
				$scope.$apply(function(){
					menu.setActiveItem(element);
					menu.setRoute($scope.route);
				});
			});
		}
	}
}