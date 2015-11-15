
/**
* Initializes module User controller
*/
module.exports = function userBaseController(vm, shell, service){
	/**
	* setting user shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.user) vm.shell.user = { selected: [], models: [], service: service, name:""};
	vm.base = "user:base:controller";

	/**
	* creates a new user model.
	*/	
	vm.newUser = function(){
		var user = shell.user.service.newUser();
		if(shell.user.name){
			user.name = shell.user.name;
			shell.user.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current user;
		vm.selectUser(user);
		// sets add new user event arguments;
		var args = {
			"channel": "user",
			"topic"  : "new:event",
			"data"   : user
		}
		// publishes the add new user event;
		vm.shell.debug(vm.base + ":new:event:published:"+ user.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new user model.
	*/	
	vm.saveUser = function(){
		if(vm.shell.user.selected[0].$state==="new"){
			vm.createUser(vm.shell.user.selected[0]);
		}
		else {
			vm.updateUser(vm.shell.user.selected[0]);
		}
	}
	
	/**
	* adds a new user with the given id
	*/
	vm.createUser = function (user){
		// checks if this is a new model
		if(user.hasOwnProperty("$state")&&user.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// user state;
		delete(user.$state);
		// creates the model
		vm.shell.user.service.createUser(user, onCreated);

		function onCreated(model){
			// adds the user to the models collection;
			vm.shell.user.models.push(model);
			// selects the current model;
			vm.selectUser(model);
			// sets add new user event arguments;
			var args = {
				"channel": "user",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new user event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given user
	*/
	vm.updateUser = function (user){
		// saves the current user;
		vm.shell.user.service.updateUser(user, onUpdated);

		function onUpdated(model){
			// selects the current model;
			vm.selectUser(model);
			// sets add new user event arguments;
			var args = {
				"channel": "user",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new user event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given user
	*/
	vm.removeUser = function (user){
		// removes the user;
		vm.shell.user.service.removeUser(user.id, onRemove);
		
		function onRemove(){
			// sets the current user to a new empty record;
			vm.selectUser(vm.newUser());
			// removes user from models;
			shell._.remove(vm.shell.user.models, function(model){
				return model.id===user.id;
			});
			// sets remove user event arguments;
			var args = {
				"channel": "user",
				"topic"  : "remove:event",
				"data"   : user
			}
			// publishes the remove user event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ user.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a user
	*/
	vm.selectUser = function (user){
		// checks if user needs to be set;
		if(!user||user.id===vm.shell.user.selected[0].id) return;
		// sets user;
		vm.shell.user.selected[0] = user;
		// sets select user event arguments;
		var args = {
			"channel": "user",
			"topic"  : "select:event",
			"data"   : user
		}
		// publishes the select user event;
		vm.shell.debug(vm.base + ":select:event:published:"+ user.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the user model collection
	*/
	vm.refresh = function(){
		vm.shell.user.models = vm.shell.user.service.getUsers();
		vm.shell.debug(vm.base + ":refresh");
	}

	/**
	* on failure callback method
	*/
	function onFailure(error){
		console.log(error);
	}

	/**
	* returns the constructor function
	*/
	return vm;
}