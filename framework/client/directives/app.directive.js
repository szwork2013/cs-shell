/**
 * initializes angular directive cs.app.framework.directive.
 */
module.exports = function csApp(){
	return {
		restrict: "E",
		controller: "AppController",
		controllerAs: "app",
		bindToController: true,
		scope: {},
		template: require("./../partials/app.content.html")
	}
}