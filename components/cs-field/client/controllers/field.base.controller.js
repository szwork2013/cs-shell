
/**
* Initializes module Field controller
*/
module.exports = function fieldBaseController(vm, shell, service){
	/**
	* setting field shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.field) vm.shell.field = { selected: [], models: [], service: service, name:""};
	vm.base = "field:base:controller";

	/**
	* creates a new field model.
	*/	
	vm.newField = function(){
		var field = shell.field.service.newField();
		if(shell.field.name){
			field.name = shell.field.name;
			shell.field.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current field;
		vm.selectField(field);
		// sets add new field event arguments;
		var args = {
			"channel": "field",
			"topic"  : "new:event",
			"data"   : field
		}
		// publishes the add new field event;
		vm.shell.debug(vm.base + ":new:event:published:"+ field.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new field model.
	*/	
	vm.saveField = function(){
		if(vm.shell.field.selected[0].$state==="new"){
			vm.createField(vm.shell.field.selected[0]);
		}
		else {
			vm.updateField(vm.shell.field.selected[0]);
		}
	}
	
	/**
	* adds a new field with the given id
	*/
	vm.createField = function (field){
		// checks if this is a new model
		if(field.hasOwnProperty("$state")&&field.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// field state;
		delete(field.$state);
		// creates the model
		vm.shell.field.service.createField(field, onCreated);

		function onCreated(model){
			// adds the field to the models collection;
			vm.shell.field.models.push(model);
			// selects the current model;
			vm.selectField(model);
			// sets add new field event arguments;
			var args = {
				"channel": "field",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new field event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given field
	*/
	vm.updateField = function (field){
		// saves the current field;
		vm.shell.field.service.updateField(field, onUpdated);

		function onUpdated(model){
			// selects the current model;
			vm.selectField(model);
			// sets add new field event arguments;
			var args = {
				"channel": "field",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new field event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given field
	*/
	vm.removeField = function (field){
		// removes the field;
		vm.shell.field.service.removeField(field.id, onRemove);
		
		function onRemove(){
			// sets the current field to a new empty record;
			vm.selectField(vm.newField());
			// removes field from models;
			shell._.remove(vm.shell.field.models, function(model){
				return model.id===field.id;
			});
			// sets remove field event arguments;
			var args = {
				"channel": "field",
				"topic"  : "remove:event",
				"data"   : field
			}
			// publishes the remove field event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ field.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a field
	*/
	vm.selectField = function (field){
		// checks if field needs to be set;
		if(!field||field.id===vm.shell.field.selected[0].id) return;
		// sets field;
		vm.shell.field.selected[0] = field;
		// sets select field event arguments;
		var args = {
			"channel": "field",
			"topic"  : "select:event",
			"data"   : field
		}
		// publishes the select field event;
		vm.shell.debug(vm.base + ":select:event:published:"+ field.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the field model collection
	*/
	vm.refresh = function(){
		vm.shell.field.models = vm.shell.field.service.getFields();
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