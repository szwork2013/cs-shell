
/**
 * Initializes angular component module cs-field
 */
module.exports = function(shell, _) {
	/**
	* class constructor Field
	*/
	function Field (options){
		// setting properties;
		this.id = shell.newId();
		this.name = null;
		this.isActive = null;
		this.type = null;
		this.tableId = null;
		// extending with options;
		_.extend(this, options);

	}
    var table = {};
    // selects a table;
    Field.prototype.setTable = function(tableId){
        shell.table.service.getById(tableId)
            .then(function(model){
                table = model;
                this.tableId = table.id;
            }	
        );
    }

	/**
	* builds the field
	*/
	Field.build = function (data) {
		return new Field({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		    type: data.type,
		    tableId: data.tableId,
		});
	};

	/**
	* returns the constructor function
	*/
	return Field;
}
module.exports.$inject = ["Shell", "_"];