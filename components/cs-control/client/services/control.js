
/**
 * Initializes angular component module cs-control
 */
module.exports = function(shell, _) {
	/**
	* class constructor Control
	*/
	function Control (options){
		// setting properties;
		this.id = shell.newId();
		this.name = null;
		this.isActive = null;
		this.type = null;
		this.extra1 = null;
		this.extra2 = null;
		// extending with options;
		_.extend(this, options);

	}
    var strips = [];
    // adds a strip to control strips;
    Control.prototype.addStrip = function(strip){
        strips.push(strip);
    }
    // gets the control strips;
    Control.prototype.getStrips = function(){
        return strips.copy();
    }

	/**
	* builds the control
	*/
	Control.build = function (data) {
		return new Control({
		    id: data.id,
		    name: data.name,
		    isActive: data.isActive,
		    type: data.type,
		    extra1: data.extra1,
		    extra2: data.extra2,
		});
	};

	/**
	* returns the constructor function
	*/
	return Control;
}
module.exports.$inject = ["Shell", "_"];