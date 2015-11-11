
/**
* Initializes module User controller
*/
module.exports = function userBaseController(vm, shell, service){
	/**
	* setting user shell services
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.user) vm.shell.user = { selected: [], models: [], service: service};
	
	/**
	* adds a new user with the given id
	*/
	vm.createUser = function (userId){
		// checks for an id if not sets one;
		if(!userId) userId = vm.shell.newId();
		// checks if the current needs to be saved
		if(vm.shell.user.isDirty){
			vm.updateUser(vm.shell.user.selected[0]);
		}
		// sets new user;
		vm.shell.user.selected[0] = {
			id:userId
		}
		// creates the model
		vm.shell.user.service.createUser
			.then(onSuccess, onFailure);

		function onSuccess(model){
			vm.shell.user.selected[0]=model;
			// sets add new user event arguments;
			var args = {
				"channel": "user",
				"topic"  : "create",
				"data"   : vm.shell.user.selected[0]
			}
			// publishes the add new user event;
			vm.shell.postal.publish(args);
		}
	}

	/**
	* saves the changes for given user
	*/
	vm.updateUser = function (user){
		// checks if the current user needs saving;
		if(!user.isDirty){
			// notifies the user;
			vm.shell.info("Nothing to save");
		}
		// saves the current user;
		// creates the model
		vm.shell.user.service.updateUser(user)
			.then(onSuccess, onFailure);

		function onSuccess(model){
		vm.shell.user.selected[0]=model;
		// sets add new user event arguments;
		var args = {
			"channel": "user",
			"topic"  : "update",
			"data"   : vm.shell.user.selected[0]
		}
		// publishes the add new user event;
		vm.shell.postal.publish(args);
		}
	}

	/**
	* removes the given user
	*/
	vm.removeUser = function (user){
		// sets the dialog options;
		var options = {
			title:"Remove user ...",
			message: "You really want to remove this user: " + user.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the user;
		vm.shell.user.service.removeUser(user)
		// sets the current user to a new empty record;
		vm.createUser();
		// removes user) from cache;
		var index = vm.shell.user.models.indexOf(user);
		if(index>-1) vm.shell.user.models.splice(index);
		// notifies that the user has been removed;
		vm.shell.info("User " + user.name + " removed!");
		// sets remove user event arguments;
		var args = {
			"channel": "user",
			"topic"  : "remove",
			"data"   : user
		}
		// publishes the remove user event;
		vm.shell.postal.publish(args);
	}

	/**
	* selects a user
	*/
	vm.selectUser = function (user){
		// checks if a user is supplied;
		// checks if user needs to be set;
		if(!user||user===vm.shell.user.selected[0]) return;
		// sets user;
		vm.shell.user.selected[0] = user;
		// sets select user event arguments;
		var args = {
			"channel": "user",
			"topic"  : "select",
			"data"   : user
		}
		// publishes the select user event;
		vm.shell.postal.publish(args);
	}

	/**
	* refreshes the user model collection
	*/
	vm.refresh = function(){
		vm.shell.user.models = vm.shell.user.service.getUsers();
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