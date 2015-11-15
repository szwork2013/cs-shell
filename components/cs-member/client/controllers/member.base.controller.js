
/**
* Initializes module Member controller
*/
module.exports = function memberBaseController(vm, shell, service){
	/**
	* setting member shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.member) vm.shell.member = { selected: [], models: [], service: service, name:""};
	vm.base = "member:base:controller";

	/**
	* creates a new member model.
	*/	
	vm.newMember = function(){
		var member = shell.member.service.newMember();
		if(shell.member.name){
			member.name = shell.member.name;
			shell.member.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current member;
		vm.selectMember(member);
		// sets add new member event arguments;
		var args = {
			"channel": "member",
			"topic"  : "new:event",
			"data"   : member
		}
		// publishes the add new member event;
		vm.shell.debug(vm.base + ":new:event:published:"+ member.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new member model.
	*/	
	vm.saveMember = function(){
		if(vm.shell.member.selected[0].$state==="new"){
			vm.createMember(vm.shell.member.selected[0]);
		}
		else {
			vm.updateMember(vm.shell.member.selected[0]);
		}
	}
	
	/**
	* adds a new member with the given id
	*/
	vm.createMember = function (member){
		// checks if this is a new model
		if(member.hasOwnProperty("$state")&&member.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// member state;
		delete(member.$state);
		// creates the model
		vm.shell.member.service.createMember(member, onCreated);

		function onCreated(model){
			// adds the member to the models collection;
			vm.shell.member.models.push(model);
			// selects the current model;
			vm.selectMember(model);
			// sets add new member event arguments;
			var args = {
				"channel": "member",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new member event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given member
	*/
	vm.updateMember = function (member){
		// saves the current member;
		vm.shell.member.service.updateMember(member, onUpdated);

		function onUpdated(model){
			// selects the current model;
			vm.selectMember(model);
			// sets add new member event arguments;
			var args = {
				"channel": "member",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new member event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given member
	*/
	vm.removeMember = function (member){
		// removes the member;
		vm.shell.member.service.removeMember(member.id, onRemove);
		
		function onRemove(){
			// sets the current member to a new empty record;
			vm.selectMember(vm.newMember());
			// removes member from models;
			shell._.remove(vm.shell.member.models, function(model){
				return model.id===member.id;
			});
			// sets remove member event arguments;
			var args = {
				"channel": "member",
				"topic"  : "remove:event",
				"data"   : member
			}
			// publishes the remove member event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ member.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a member
	*/
	vm.selectMember = function (member){
		// checks if member needs to be set;
		if(!member||member.id===vm.shell.member.selected[0].id) return;
		// sets member;
		vm.shell.member.selected[0] = member;
		// sets select member event arguments;
		var args = {
			"channel": "member",
			"topic"  : "select:event",
			"data"   : member
		}
		// publishes the select member event;
		vm.shell.debug(vm.base + ":select:event:published:"+ member.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the member model collection
	*/
	vm.refresh = function(){
		vm.shell.member.models = vm.shell.member.service.getMembers();
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