
/**
* Initializes module Control controller
*/
module.exports = function controlBaseController(vm, shell, service){
	/**
	* setting control shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.control) vm.shell.control = { selected: [], models: [], service: service, name:""};
	vm.base = "control:base:controller";

	/**
	* creates a new control model.
	*/	
	vm.newControl = function(){
		var control = shell.control.service.newControl();
		if(shell.control.name){
			control.name = shell.control.name;
			shell.control.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current control;
		vm.selectControl(control);
		// sets add new control event arguments;
		var args = {
			"channel": "control",
			"topic"  : "new:event",
			"data"   : control
		}
		// publishes the add new control event;
		vm.shell.debug(vm.base + ":new:event:published:"+ control.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new control model.
	*/	
	vm.saveControl = function(){
		if(vm.shell.control.selected[0].$state==="new"){
			vm.createControl(vm.shell.control.selected[0]);
		}
		else {
			vm.updateControl(vm.shell.control.selected[0]);
		}
	}
	
	/**
	* adds a new control with the given id
	*/
	vm.createControl = function (control){
		// checks if this is a new model
		if(control.hasOwnProperty("$state")&&control.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// control state;
		delete(control.$state);
		// creates the model
		vm.shell.control.service.createControl(control, onCreated);

		function onCreated(model){
			// adds the control to the models collection;
			vm.shell.control.models.push(model);
			// selects the current model;
			vm.selectControl(model);
			// sets add new control event arguments;
			var args = {
				"channel": "control",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new control event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given control
	*/
	vm.updateControl = function (control){
		// saves the current control;
		vm.shell.control.service.updateControl(control, onUpdated);

		function onUpdated(model){
			// selects the current model;
			vm.selectControl(model);
			// sets add new control event arguments;
			var args = {
				"channel": "control",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new control event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given control
	*/
	vm.removeControl = function (control){
		// removes the control;
		vm.shell.control.service.removeControl(control.id, onRemove);
		
		function onRemove(){
			// sets the current control to a new empty record;
			vm.selectControl(vm.newControl());
			// removes control from models;
			shell._.remove(vm.shell.control.models, function(model){
				return model.id===control.id;
			});
			// sets remove control event arguments;
			var args = {
				"channel": "control",
				"topic"  : "remove:event",
				"data"   : control
			}
			// publishes the remove control event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ control.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a control
	*/
	vm.selectControl = function (control){
		// checks if control needs to be set;
		if(!control||control.id===vm.shell.control.selected[0].id) return;
		// sets control;
		vm.shell.control.selected[0] = control;
		// sets select control event arguments;
		var args = {
			"channel": "control",
			"topic"  : "select:event",
			"data"   : control
		}
		// publishes the select control event;
		vm.shell.debug(vm.base + ":select:event:published:"+ control.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the control model collection
	*/
	vm.refresh = function(){
		vm.shell.control.models = vm.shell.control.service.getControls();
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