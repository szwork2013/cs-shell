
/**
* Initializes module Organisation controller
*/
module.exports = function organisationBaseController(vm, shell, service){
	/**
	* setting organisation shell services
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.organisation) vm.shell.organisation = { selected: [], models: [], service: service};
	
	/**
	* adds a new organisation with the given id
	*/
	vm.createOrganisation = function (organisationId){
		// checks for an id if not sets one;
		if(!organisationId) organisationId = vm.shell.newId();
		// checks if the current needs to be saved
		if(vm.shell.organisation.isDirty){
			vm.updateOrganisation(vm.shell.organisation.selected[0]);
		}
		// sets new organisation;
		vm.shell.organisation.selected[0] = {
			id:organisationId
		}
		// creates the model
		vm.shell.organisation.service.createOrganisation
			.then(onSuccess, onFailure);

		function onSuccess(model){
			vm.shell.organisation.selected[0]=model;
			// sets add new organisation event arguments;
			var args = {
				"channel": "organisation",
				"topic"  : "create",
				"data"   : vm.shell.organisation.selected[0]
			}
			// publishes the add new organisation event;
			vm.shell.postal.publish(args);
		}
	}

	/**
	* saves the changes for given organisation
	*/
	vm.updateOrganisation = function (organisation){
		// checks if the current organisation needs saving;
		if(!organisation.isDirty){
			// notifies the organisation;
			vm.shell.info("Nothing to save");
		}
		// saves the current organisation;
		// creates the model
		vm.shell.organisation.service.updateOrganisation
		.then(onSuccess, onFailure);

		function onSuccess(model){
		vm.shell.organisation.selected[0]=model;
		// sets add new organisation event arguments;
		var args = {
			"channel": "organisation",
			"topic"  : "update",
			"data"   : vm.shell.organisation.selected[0]
		}
		// publishes the add new organisation event;
		vm.shell.postal.publish(args);
		}
	}

	/**
	* removes the given organisation
	*/
	vm.removeOrganisation = function (organisation){
		// sets the dialog options;
		var options = {
			title:"Remove organisation ...",
			message: "You really want to remove this organisation: " + organisation.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the organisation;
		vm.shell.organisation.service.removeOrganisation(organisation)
		// sets the current organisation to a new empty record;
		vm.createOrganisation();
		// removes organisation) from cache;
		var index = vm.shell.organisation.models.indexOf(organisation);
		if(index>-1) vm.shell.organisation.models.splice(index);
		// notifies that the organisation has been removed;
		vm.shell.info("Organisation " + organisation.name + " removed!");
		// sets remove organisation event arguments;
		var args = {
			"channel": "organisation",
			"topic"  : "remove",
			"data"   : organisation
		}
		// publishes the remove organisation event;
		vm.shell.postal.publish(args);
	}

	/**
	* selects a organisation
	*/
	vm.selectOrganisation = function (organisation){
		// checks if a organisation is supplied;
		// checks if organisation needs to be set;
		if(!organisation||organisation===vm.shell.organisation.selected[0]) return;
		// sets organisation;
		vm.shell.organisation.selected[0] = organisation;
		// sets select organisation event arguments;
		var args = {
			"channel": "organisation",
			"topic"  : "select",
			"data"   : organisation
		}
		// publishes the select organisation event;
		vm.shell.postal.publish(args);
	}

	/**
	* refreshes the organisation model collection
	*/
	vm.refresh = function(){
		vm.shell.organisation.models = vm.shell.organisation.service.getOrganisations();
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