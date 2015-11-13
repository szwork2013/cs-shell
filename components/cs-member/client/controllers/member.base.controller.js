
/**
* Initializes module Member controller
*/
module.exports = function memberBaseController(vm, shell, service){
	/**
	* setting member shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.member) vm.shell.member = { selected: [], models: [], service: service};
	vm.base = "member:base:controller";
	
	/**
	* adds a new member with the given id
	*/
	vm.createMember = function (memberId){
		// checks for an id if not sets one;
		if(!memberId) memberId = vm.shell.newId();
		// sets new member;
		vm.shell.member.selected[0] = {
			id:memberId
		}
		// creates the model
		vm.shell.member.service.createMember(member, onCreated);

		function onCreated(model){
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
		// checks if the current member needs saving;
		if(!member.isDirty){
			// notifies the member;
			vm.shell.info("Nothing to save");
		}
		// saves the current member;
		// creates the model
		vm.shell.member.service.updateMember(member, onUpdated);

		function onUpdated(model){
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
		// sets the dialog options;
		var options = {
			title:"Remove member ...",
			message: "You really want to remove this member: " + member.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the member;
		vm.shell.member.service.removeMember(member)
		// sets the current member to a new empty record;
		vm.createMember();
		// removes member) from cache;
		var index = vm.shell.member.models.indexOf(member);
		if(index>-1) vm.shell.member.models.splice(index);
		// notifies that the member has been removed;
		vm.shell.info("Member " + member.name + " removed!");
		// sets remove member event arguments;
		var args = {
			"channel": "member",
			"topic"  : "remove:event",
			"data"   : member
		}
		// publishes the remove member event;
		vm.shell.debug(vm.base + ":remove:event:published"+ member.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* selects a member
	*/
	vm.selectMember = function (member){
		// checks if a member is supplied;
		// checks if member needs to be set;
		if(!member||member===vm.shell.member.selected[0]) return;
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