/**
 * initializes angular directive cs.app.menuItem.directive.
 */
module.exports = function menuItem(){
	return {
		restrict: "E",
		require: "^csAppSidebar",
		template: require("./../partials/menu.item.html"),
		scope: {
			label: "@",
			route:"@",
			icon: "@"
		},
		link: function($scope, element, attrs, sidebar){
			$scope.isActive = function(){
				return element === sidebar.element;
			}
			
			element.on("click", function(event){
				event.stopPropagation();
				event.preventDefault();
				$scope.$apply(function(){
					sidebar.setActiveItem(element);
					sidebar.setRoute($scope.route);
				});
			});
		}
	}
}