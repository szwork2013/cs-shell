
/**
* Initializes module Strip controller
*/
module.exports = function stripBaseController(vm, shell, service){
	/**
	* setting strip shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.strip) vm.shell.strip = { selected: [], models: [], service: service};
	vm.base = "strip:base:controller";
	
	/**
	* adds a new strip with the given id
	*/
	vm.createStrip = function (stripId){
		// checks for an id if not sets one;
		if(!stripId) stripId = vm.shell.newId();
		// sets new strip;
		vm.shell.strip.selected[0] = {
			id:stripId
		}
		// creates the model
		vm.shell.strip.service.createStrip(strip, onCreated);

		function onCreated(model){
			vm.selectStrip(model);
			// sets add new strip event arguments;
			var args = {
				"channel": "strip",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new strip event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given strip
	*/
	vm.updateStrip = function (strip){
		// checks if the current strip needs saving;
		if(!strip.isDirty){
			// notifies the strip;
			vm.shell.info("Nothing to save");
		}
		// saves the current strip;
		// creates the model
		vm.shell.strip.service.updateStrip(strip, onUpdated);

		function onUpdated(model){
			vm.selectStrip(model);
			// sets add new strip event arguments;
			var args = {
				"channel": "strip",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new strip event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given strip
	*/
	vm.removeStrip = function (strip){
		// sets the dialog options;
		var options = {
			title:"Remove strip ...",
			message: "You really want to remove this strip: " + strip.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the strip;
		vm.shell.strip.service.removeStrip(strip)
		// sets the current strip to a new empty record;
		vm.createStrip();
		// removes strip) from cache;
		var index = vm.shell.strip.models.indexOf(strip);
		if(index>-1) vm.shell.strip.models.splice(index);
		// notifies that the strip has been removed;
		vm.shell.info("Strip " + strip.name + " removed!");
		// sets remove strip event arguments;
		var args = {
			"channel": "strip",
			"topic"  : "remove:event",
			"data"   : strip
		}
		// publishes the remove strip event;
		vm.shell.debug(vm.base + ":remove:event:published"+ strip.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* selects a strip
	*/
	vm.selectStrip = function (strip){
		// checks if a strip is supplied;
		// checks if strip needs to be set;
		if(!strip||strip===vm.shell.strip.selected[0]) return;
		// sets strip;
		vm.shell.strip.selected[0] = strip;
		// sets select strip event arguments;
		var args = {
			"channel": "strip",
			"topic"  : "select:event",
			"data"   : strip
		}
		// publishes the select strip event;
		vm.shell.debug(vm.base + ":select:event:published:"+ strip.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the strip model collection
	*/
	vm.refresh = function(){
		vm.shell.strip.models = vm.shell.strip.service.getStrips();
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