
/**
 * Module dependencies.
 */
var base = require("components/cs-strip/client/controllers/strip.base.controller");
require("ng-cache?!components/cs-cards/todo.html");

/**
* Initializes module Task controller.
*/
module.exports = function taskController($scope, shell, service){
	// sets the viewmodel variables;
	var task = base(this, shell, service);
	task.items = [];	
	
	// #region "select" 
	/**
	* @name select
	* @desc Selects a Task model.
	* @memberOf Task.Controller
	*/
	task.addTask = function() {			
		// sets the strip model as selected:
		var strip = task.newStrip();		
		// complates form information:
		var form ={
			id:strip.id,
			name:"todo.html",
			title:strip.name,
			isSingleton: false,
			data: strip
		}

		// triggers event;
		task.shell.postal.publish({
			channel: "task.page",
			topic: "add.form",
			data: form
		});
	}
	// #endregion
}
module.exports.$inject = ["$scope", "Shell", "StripService"]