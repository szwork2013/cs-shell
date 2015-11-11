
/**
* Initializes module Table controller
*/
module.exports = function tableBaseController(vm, shell, service){
	/**
	* setting table shell services
	*/
	if(!vm.shell) vm.shell = shell;
	if(!vm.shell.table) vm.shell.table = { selected: [], models: [], service: service};
	
	/**
	* adds a new table with the given id
	*/
	vm.createTable = function (tableId){
		// checks for an id if not sets one;
		if(!tableId) tableId = vm.shell.newId();
		// checks if the current needs to be saved
		if(vm.shell.table.isDirty){
			vm.updateTable(vm.shell.table.selected[0]);
		}
		// sets new table;
		vm.shell.table.selected[0] = {
			id:tableId
		}
		// creates the model
		vm.shell.table.service.createTable
			.then(onSuccess, onFailure);

		function onSuccess(model){
			vm.shell.table.selected[0]=model;
			// sets add new table event arguments;
			var args = {
				"channel": "table",
				"topic"  : "create",
				"data"   : vm.shell.table.selected[0]
			}
			// publishes the add new table event;
			vm.shell.postal.publish(args);
		}
	}

	/**
	* saves the changes for given table
	*/
	vm.updateTable = function (table){
		// checks if the current table needs saving;
		if(!table.isDirty){
			// notifies the table;
			vm.shell.info("Nothing to save");
		}
		// saves the current table;
		// creates the model
		vm.shell.table.service.updateTable(table)
			.then(onSuccess, onFailure);

		function onSuccess(model){
		vm.shell.table.selected[0]=model;
		// sets add new table event arguments;
		var args = {
			"channel": "table",
			"topic"  : "update",
			"data"   : vm.shell.table.selected[0]
		}
		// publishes the add new table event;
		vm.shell.postal.publish(args);
		}
	}

	/**
	* removes the given table
	*/
	vm.removeTable = function (table){
		// sets the dialog options;
		var options = {
			title:"Remove table ...",
			message: "You really want to remove this table: " + table.name + " and all its' related information?",
			ok: "Yes",
			cancel: "No"
		}
		// checks if this record should really be removed;
		if(!vm.shell.dialog(options)) return;
		// removes the table;
		vm.shell.table.service.removeTable(table)
		// sets the current table to a new empty record;
		vm.createTable();
		// removes table) from cache;
		var index = vm.shell.table.models.indexOf(table);
		if(index>-1) vm.shell.table.models.splice(index);
		// notifies that the table has been removed;
		vm.shell.info("Table " + table.name + " removed!");
		// sets remove table event arguments;
		var args = {
			"channel": "table",
			"topic"  : "remove",
			"data"   : table
		}
		// publishes the remove table event;
		vm.shell.postal.publish(args);
	}

	/**
	* selects a table
	*/
	vm.selectTable = function (table){
		// checks if a table is supplied;
		// checks if table needs to be set;
		if(!table||table===vm.shell.table.selected[0]) return;
		// sets table;
		vm.shell.table.selected[0] = table;
		// sets select table event arguments;
		var args = {
			"channel": "table",
			"topic"  : "select",
			"data"   : table
		}
		// publishes the select table event;
		vm.shell.postal.publish(args);
	}

	/**
	* refreshes the table model collection
	*/
	vm.refresh = function(){
		vm.shell.table.models = vm.shell.table.service.getTables();
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