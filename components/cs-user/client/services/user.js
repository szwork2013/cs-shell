
/**
 * Initializes angular component module cs-user
 */
module.exports = function(shell, _) {
	/**
	* class constructor User
	*/
	function User (options){
		// setting properties;
		this.id = shell.newId();
		this.name = null;
		this.isActive = null;
		this.email = null;
		this.password = null;
		this.file = null;
		this.dob = null;
		this.city = null;
		// extending with options;
		_.extend(this, options);

	}
    var members = [];
    // adds a member to user members;
    User.prototype.addMember = function(member){
        members.push(member);
    }
    // gets the user members;
    User.prototype.getMembers = function(){
        return members.copy();
    }

	/**
	* builds the user
	*/
	User.build = function (data) {
		return new User({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		    email: data.email,
		    password: data.password,
		    file: data.file,
		    dob: data.dob,
		    city: data.city,
		});
	};

	/**
	* returns the constructor function
	*/
	return User;
}
module.exports.$inject = ["Shell", "_"];