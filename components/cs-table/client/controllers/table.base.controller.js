
/**
* Initializes module Table controller
*/
module.exports = function tableBaseController(vm, shell, service){
	/**
	* setting table shell service varuables
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.table) vm.shell.table = { selected: [], models: [], service: service, name:""};
	vm.base = "table:base:controller";

	/**
	* creates a new table model.
	*/	
	vm.newTable = function(){
		var table = shell.table.service.newTable();
		if(shell.table.name){
			table.name = shell.table.name;
			shell.table.name = "";
		}
		vm.shell.debug(vm.base + ":created:new");
		// selects the current table;
		vm.selectTable(table);
		// sets add new table event arguments;
		var args = {
			"channel": "table",
			"topic"  : "new:event",
			"data"   : table
		}
		// publishes the add new table event;
		vm.shell.debug(vm.base + ":new:event:published:"+ table.id);
		vm.shell.postal.publish(args);
	}

	/**
	* saves a new table model.
	*/	
	vm.saveTable = function(){
		if(vm.shell.table.selected[0].$state==="new"){
			vm.createTable(vm.shell.table.selected[0]);
		}
		else {
			vm.updateTable(vm.shell.table.selected[0]);
		}
	}
	
	/**
	* adds a new table with the given id
	*/
	vm.createTable = function (table){
		// checks if this is a new model
		if(table.hasOwnProperty("$state")&&table.$state!=="new"){
			vm.shell.debug(vm.base + ":create:state:isnot:new");
			return;
		} 
		// table state;
		delete(table.$state);
		// creates the model
		vm.shell.table.service.createTable(table, onCreated);

		function onCreated(model){
			// adds the table to the models collection;
			vm.shell.table.models.push(model);
			// selects the current model;
			vm.selectTable(model);
			// sets add new table event arguments;
			var args = {
				"channel": "table",
				"topic"  : "create:event",
				"data"   : model
			}
			// publishes the add new table event;
			vm.shell.debug(vm.base + ":create:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* saves the changes for given table
	*/
	vm.updateTable = function (table){
		// saves the current table;
		vm.shell.table.service.updateTable(table, onUpdated);

		function onUpdated(model){
			// selects the current model;
			vm.selectTable(model);
			// sets add new table event arguments;
			var args = {
				"channel": "table",
				"topic"  : "update:event",
				"data"   : model
			}
			// publishes the add new table event;
			vm.shell.debug(vm.base + ":update:event:published:"+ model.id);
			vm.shell.postal.publish(args);			
		}
	}

	/**
	* removes the given table
	*/
	vm.removeTable = function (table){
		// removes the table;
		vm.shell.table.service.removeTable(table.id, onRemove);
		
		function onRemove(){
			// sets the current table to a new empty record;
			vm.selectTable(vm.newTable());
			// removes table from models;
			shell._.remove(vm.shell.table.models, function(model){
				return model.id===table.id;
			});
			// sets remove table event arguments;
			var args = {
				"channel": "table",
				"topic"  : "remove:event",
				"data"   : table
			}
			// publishes the remove table event;
			vm.shell.debug(vm.base + ":remove:event:published:"+ table.id);
			vm.shell.postal.publish(args);	
		}	
	}

	/**
	* selects a table
	*/
	vm.selectTable = function (table){
		// checks if table needs to be set;
		if(!table||table.id===vm.shell.table.selected[0].id) return;
		// sets table;
		vm.shell.table.selected[0] = table;
		// sets select table event arguments;
		var args = {
			"channel": "table",
			"topic"  : "select:event",
			"data"   : table
		}
		// publishes the select table event;
		vm.shell.debug(vm.base + ":select:event:published:"+ table.id);
		vm.shell.postal.publish(args);		
	}

	/**
	* refreshes the table model collection
	*/
	vm.refresh = function(){
		vm.shell.table.models = vm.shell.table.service.getTables();
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