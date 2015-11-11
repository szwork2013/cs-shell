
/**
* Initializes module Control controller
*/
module.exports = function controlBaseController(vm, shell, service){
	/**
	* setting control shell services
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.control) vm.shell.control = { selected: [], models: [], service: service};
	
	/**
	* adds a new control with the given id
	*/
	vm.createControl = function (controlId){
		// checks for an id if not sets one;
		if(!controlId) controlId = vm.shell.newId();
		// checks if the current needs to be saved
		if(vm.shell.control.isDirty){
			vm.updateControl(vm.shell.control.selected[0]);
		}
		// sets new control;
		vm.shell.control.selected[0] = {
			id:controlId
		}
		// creates the model
		vm.shell.control.service.createControl
			.then(onSuccess, onFailure);

		function onSuccess(model){
			vm.shell.control.selected[0]=model;
			// sets add new control event arguments;
			var args = {
				"channel": "control",
				"topic"  : "create",
				"data"   : vm.shell.control.selected[0]
			}
			// publishes the add new control event;
			vm.shell.postal.publish(args);
		}
	}

	/**
	* saves the changes for given control
	*/
	vm.updateControl = function (control){
		// checks if the current control needs saving;
		if(!control.isDirty){
			// notifies the control;
			vm.shell.info("Nothing to save");
		}
		// saves the current control;
		// creates the model
		vm.shell.control.service.updateControl(control)
			.then(onSuccess, onFailure);

		function onSuccess(model){
		vm.shell.control.selected[0]=model;
		// sets add new control event arguments;
		var args = {
			"channel": "control",
			"topic"  : "update",
			"data"   : vm.shell.control.selected[0]
		}
		// publishes the add new control event;
		vm.shell.postal.publish(args);
		}
	}

	/**
	* removes the given control
	*/
	vm.removeControl = function (control){
		// sets the dialog options;
		var options = {
			title:"Remove control ...",
			message: "You really want to remove this control: " + control.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the control;
		vm.shell.control.service.removeControl(control)
		// sets the current control to a new empty record;
		vm.createControl();
		// removes control) from cache;
		var index = vm.shell.control.models.indexOf(control);
		if(index>-1) vm.shell.control.models.splice(index);
		// notifies that the control has been removed;
		vm.shell.info("Control " + control.name + " removed!");
		// sets remove control event arguments;
		var args = {
			"channel": "control",
			"topic"  : "remove",
			"data"   : control
		}
		// publishes the remove control event;
		vm.shell.postal.publish(args);
	}

	/**
	* selects a control
	*/
	vm.selectControl = function (control){
		// checks if a control is supplied;
		// checks if control needs to be set;
		if(!control||control===vm.shell.control.selected[0]) return;
		// sets control;
		vm.shell.control.selected[0] = control;
		// sets select control event arguments;
		var args = {
			"channel": "control",
			"topic"  : "select",
			"data"   : control
		}
		// publishes the select control event;
		vm.shell.postal.publish(args);
	}

	/**
	* refreshes the control model collection
	*/
	vm.refresh = function(){
		vm.shell.control.models = vm.shell.control.service.getControls();
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