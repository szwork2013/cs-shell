
/**
 * Initializes angular component module cs-organisation
 */
module.exports = function(shell, _) {
	/**
	* class constructor Organisation
	*/
	function Organisation (options){
		// setting properties;
		this.$state = "normal";
		this.id = null;
		this.name = null;
		this.isActive = null;
		// extending with options when provided;
		if(options)
			_.extend(this, options);

	}
    var members = [];
    // adds a member to organisation members;
    Organisation.prototype.addMember = function(member){
        members.push(member);
    }
    // gets the organisation members;
    Organisation.prototype.getMembers = function(){
        return members.copy();
    }

	/**
	* builds the organisation
	*/
	Organisation.build = function (data) {
		return new Organisation({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		});
	};

	/**
	* returns the constructor function
	*/
	return Organisation;
}
module.exports.$inject = ["Shell", "_"];