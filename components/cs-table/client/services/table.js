
/**
 * Initializes angular component module cs-table
 */
module.exports = function(shell, _) {
	/**
	* class constructor Table
	*/
	function Table (options){
		// setting properties;
		this.id = shell.newId();
		this.name = null;
		this.isActive = null;
		this.stripId = null;
		// extending with options;
		_.extend(this, options);

	}
    var strip = {};
    // selects a strip;
    Table.prototype.setStrip = function(stripId){
        shell.strip.service.getById(stripId)
            .then(function(model){
                strip = model;
                this.stripId = strip.id;
            }	
        );
    }
    var fields = [];
    // adds a field to table fields;
    Table.prototype.addField = function(field){
        fields.push(field);
    }
    // gets the table fields;
    Table.prototype.getFields = function(){
        return fields.copy();
    }

	/**
	* builds the table
	*/
	Table.build = function (data) {
		return new Table({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		    stripId: data.stripId,
		});
	};

	/**
	* returns the constructor function
	*/
	return Table;
}
module.exports.$inject = ["Shell", "_"];