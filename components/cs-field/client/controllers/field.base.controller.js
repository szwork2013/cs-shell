
/**
* Initializes module Field controller
*/
module.exports = function fieldBaseController(vm, shell, service){
	/**
	* setting field shell services
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.field) vm.shell.field = { selected: [], models: [], service: service};
	
	/**
	* adds a new field with the given id
	*/
	vm.createField = function (fieldId){
		// checks for an id if not sets one;
		if(!fieldId) fieldId = vm.shell.newId();
		// checks if the current needs to be saved
		if(vm.shell.field.isDirty){
			vm.updateField(vm.shell.field.selected[0]);
		}
		// sets new field;
		vm.shell.field.selected[0] = {
			id:fieldId
		}
		// creates the model
		vm.shell.field.service.createField
			.then(onSuccess, onFailure);

		function onSuccess(model){
			vm.shell.field.selected[0]=model;
			// sets add new field event arguments;
			var args = {
				"channel": "field",
				"topic"  : "create",
				"data"   : vm.shell.field.selected[0]
			}
			// publishes the add new field event;
			vm.shell.postal.publish(args);
		}
	}

	/**
	* saves the changes for given field
	*/
	vm.updateField = function (field){
		// checks if the current field needs saving;
		if(!field.isDirty){
			// notifies the field;
			vm.shell.info("Nothing to save");
		}
		// saves the current field;
		// creates the model
		vm.shell.field.service.updateField(field)
			.then(onSuccess, onFailure);

		function onSuccess(model){
		vm.shell.field.selected[0]=model;
		// sets add new field event arguments;
		var args = {
			"channel": "field",
			"topic"  : "update",
			"data"   : vm.shell.field.selected[0]
		}
		// publishes the add new field event;
		vm.shell.postal.publish(args);
		}
	}

	/**
	* removes the given field
	*/
	vm.removeField = function (field){
		// sets the dialog options;
		var options = {
			title:"Remove field ...",
			message: "You really want to remove this field: " + field.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the field;
		vm.shell.field.service.removeField(field)
		// sets the current field to a new empty record;
		vm.createField();
		// removes field) from cache;
		var index = vm.shell.field.models.indexOf(field);
		if(index>-1) vm.shell.field.models.splice(index);
		// notifies that the field has been removed;
		vm.shell.info("Field " + field.name + " removed!");
		// sets remove field event arguments;
		var args = {
			"channel": "field",
			"topic"  : "remove",
			"data"   : field
		}
		// publishes the remove field event;
		vm.shell.postal.publish(args);
	}

	/**
	* selects a field
	*/
	vm.selectField = function (field){
		// checks if a field is supplied;
		// checks if field needs to be set;
		if(!field||field===vm.shell.field.selected[0]) return;
		// sets field;
		vm.shell.field.selected[0] = field;
		// sets select field event arguments;
		var args = {
			"channel": "field",
			"topic"  : "select",
			"data"   : field
		}
		// publishes the select field event;
		vm.shell.postal.publish(args);
	}

	/**
	* refreshes the field model collection
	*/
	vm.refresh = function(){
		vm.shell.field.models = vm.shell.field.service.getFields();
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