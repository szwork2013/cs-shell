
/**
 * Initializes angular component module cs-strip
 */
module.exports = function(shell, _) {
	/**
	* class constructor Strip
	*/
	function Strip (options){
		// setting properties;
		this.$state = "normal";
		this.id = null;
		this.name = null;
		this.isActive = null;
		this.controlId = null;
		this.parentId = null;
		// extending with options when provided;
		if(options)
			_.extend(this, options);

	}
    var control = {};
    // selects a control;
    Strip.prototype.setControl = function(controlId){
        shell.control.service.getById(controlId)
            .then(function(model){
                control = model;
                this.controlId = control.id;
            }	
        );
    }
    var parent = {};
    // selects a parent;
    Strip.prototype.setParent = function(parentId){
        shell.strip.service.getById(parentId)
            .then(function(model){
                parent = model;
                this.parentId = parent.id;
            }	
        );
    }
    var children = [];
    // adds a child to strip children;
    Strip.prototype.addChild = function(child){
        children.push(child);
    }
    // gets the strip children;
    Strip.prototype.getChildren = function(){
        return children.copy();
    }
    var members = [];
    // adds a member to strip members;
    Strip.prototype.addMember = function(member){
        members.push(member);
    }
    // gets the strip members;
    Strip.prototype.getMembers = function(){
        return members.copy();
    }
    var tables = [];
    // adds a table to strip tables;
    Strip.prototype.addTable = function(table){
        tables.push(table);
    }
    // gets the strip tables;
    Strip.prototype.getTables = function(){
        return tables.copy();
    }

	/**
	* builds the strip
	*/
	Strip.build = function (data) {
		return new Strip({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		    controlId: data.controlId,
		    parentId: data.parentId,
		});
	};

	/**
	* returns the constructor function
	*/
	return Strip;
}
module.exports.$inject = ["Shell", "_"];