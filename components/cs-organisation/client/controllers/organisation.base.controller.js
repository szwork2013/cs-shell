
/**
* Initializes module Organisation controller
*/
module.exports = function organisationBaseController(vm, shell, service){
	/**
	* setting organisation shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.organisation) vm.shell.organisation = { selected: [], models: [], service: service, name:""};
	vm.base = "organisation:base:controller";

	/**
	* creates a new organisation model.
	*/	
	vm.newOrganisation = function(){
		var organisation = shell.organisation.service.newOrganisation();
		if(shell.organisation.name){
			organisation.name = shell.organisation.name;
			shell.organisation.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current organisation;
		vm.selectOrganisation(organisation);
		// sets add new organisation event arguments;
		var args = {
			"channel": "organisation",
			"topic"  : "new:event",
			"data"   : organisation
		}
		// publishes the add new organisation event;
		vm.shell.debug(vm.base + ":new:event:published:"+ organisation.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new organisation model.
	*/	
	vm.saveOrganisation = function(){
		if(vm.shell.organisation.selected[0].$state==="new"){
			vm.createOrganisation(vm.shell.organisation.selected[0]);
		}
		else {
			vm.updateOrganisation(vm.shell.organisation.selected[0]);
		}
	}
	
	/**
	* adds a new organisation with the given id
	*/
	vm.createOrganisation = function (organisation){
		// checks if this is a new model
		if(organisation.hasOwnProperty("$state")&&organisation.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// organisation state;
		delete(organisation.$state);
		// creates the model
		vm.shell.organisation.service.createOrganisation(organisation, onCreated);

		function onCreated(model){
			// adds the organisation to the models collection;
			vm.shell.organisation.models.push(model);
			// selects the current model;
			vm.selectOrganisation(model);
			// sets add new organisation event arguments;
			var args = {
				"channel": "organisation",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new organisation event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given organisation
	*/
	vm.updateOrganisation = function (organisation){
		// saves the current organisation;
		vm.shell.organisation.service.updateOrganisation(organisation, onUpdated);

		function onUpdated(model){
			// selects the current model;
			vm.selectOrganisation(model);
			// sets add new organisation event arguments;
			var args = {
				"channel": "organisation",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new organisation event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given organisation
	*/
	vm.removeOrganisation = function (organisation){
		// removes the organisation;
		vm.shell.organisation.service.removeOrganisation(organisation.id, onRemove);
		
		function onRemove(){
			// sets the current organisation to a new empty record;
			vm.selectOrganisation(vm.newOrganisation());
			// removes organisation from models;
			shell._.remove(vm.shell.organisation.models, function(model){
				return model.id===organisation.id;
			});
			// sets remove organisation event arguments;
			var args = {
				"channel": "organisation",
				"topic"  : "remove:event",
				"data"   : organisation
			}
			// publishes the remove organisation event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ organisation.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a organisation
	*/
	vm.selectOrganisation = function (organisation){
		// checks if organisation needs to be set;
		if(!organisation||organisation.id===vm.shell.organisation.selected[0].id) return;
		// sets organisation;
		vm.shell.organisation.selected[0] = organisation;
		// sets select organisation event arguments;
		var args = {
			"channel": "organisation",
			"topic"  : "select:event",
			"data"   : organisation
		}
		// publishes the select organisation event;
		vm.shell.debug(vm.base + ":select:event:published:"+ organisation.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the organisation model collection
	*/
	vm.refresh = function(){
		vm.shell.organisation.models = vm.shell.organisation.service.getOrganisations();
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