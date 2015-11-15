
/**
 * Initializes angular component module cs-member
 */
module.exports = function(shell, _) {
	/**
	* class constructor Member
	*/
	function Member (options){
		// setting properties;
		this.$state = "normal";
		this.id = null;
		this.name = null;
		this.isActive = null;
		this.userId = null;
		this.stripId = null;
		this.organisationId = null;
		this.privileges = null;
		this.state = null;
		// extending with options when provided;
		if(options)
			_.extend(this, options);

	}
    var user = {};
    // selects a user;
    Member.prototype.setUser = function(userId){
        shell.user.service.getById(userId)
            .then(function(model){
                user = model;
                this.userId = user.id;
            }	
        );
    }
    var strip = {};
    // selects a strip;
    Member.prototype.setStrip = function(stripId){
        shell.strip.service.getById(stripId)
            .then(function(model){
                strip = model;
                this.stripId = strip.id;
            }	
        );
    }
    var organisation = {};
    // selects a organisation;
    Member.prototype.setOrganisation = function(organisationId){
        shell.organisation.service.getById(organisationId)
            .then(function(model){
                organisation = model;
                this.organisationId = organisation.id;
            }	
        );
    }

	/**
	* builds the member
	*/
	Member.build = function (data) {
		return new Member({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		    userId: data.userId,
		    stripId: data.stripId,
		    organisationId: data.organisationId,
		    privileges: data.privileges,
		    state: data.state,
		});
	};

	/**
	* returns the constructor function
	*/
	return Member;
}
module.exports.$inject = ["Shell", "_"];