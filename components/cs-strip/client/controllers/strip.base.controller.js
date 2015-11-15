
/**
* Initializes module Strip controller
*/
module.exports = function stripBaseController(vm, shell, service){
	/**
	* setting strip shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.strip) vm.shell.strip = { selected: [], models: [], service: service, name:""};
	vm.base = "strip:base:controller";

	/**
	* creates a new strip model.
	*/	
	vm.newStrip = function(){
		var strip = shell.strip.service.newStrip();
		if(shell.strip.name){
			strip.name = shell.strip.name;
			shell.strip.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current strip;
		vm.selectStrip(strip);
		// sets add new strip event arguments;
		var args = {
			"channel": "strip",
			"topic"  : "new:event",
			"data"   : strip
		}
		// publishes the add new strip event;
		vm.shell.debug(vm.base + ":new:event:published:"+ strip.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new strip model.
	*/	
	vm.saveStrip = function(){
		if(vm.shell.strip.selected[0].$state==="new"){
			vm.createStrip(vm.shell.strip.selected[0]);
		}
		else {
			vm.updateStrip(vm.shell.strip.selected[0]);
		}
	}
	
	/**
	* adds a new strip with the given id
	*/
	vm.createStrip = function (strip){
		// checks if this is a new model
		if(strip.hasOwnProperty("$state")&&strip.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// strip state;
		delete(strip.$state);
		// creates the model
		vm.shell.strip.service.createStrip(strip, onCreated);

		function onCreated(model){
			// adds the strip to the models collection;
			vm.shell.strip.models.push(model);
			// selects the current model;
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
		// saves the current strip;
		vm.shell.strip.service.updateStrip(strip, onUpdated);

		function onUpdated(model){
			// selects the current model;
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
		// removes the strip;
		vm.shell.strip.service.removeStrip(strip.id, onRemove);
		
		function onRemove(){
			// sets the current strip to a new empty record;
			vm.selectStrip(vm.newStrip());
			// removes strip from models;
			shell._.remove(vm.shell.strip.models, function(model){
				return model.id===strip.id;
			});
			// sets remove strip event arguments;
			var args = {
				"channel": "strip",
				"topic"  : "remove:event",
				"data"   : strip
			}
			// publishes the remove strip event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ strip.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a strip
	*/
	vm.selectStrip = function (strip){
		// checks if strip needs to be set;
		if(!strip||strip.id===vm.shell.strip.selected[0].id) return;
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