
/**
 * Initializes angular component module cs-control service.
 */
module.exports = function($http, api, Control, _) {
	// sets url;
	var url = api + "/controls";

	// sets up service;
	var service = {};

	/**
	* gets all control models
	*/
	service.getControls = function () {
		$http.get(url).then(function(models){
			var controls = [];
			_.forEach(models, function(model){
				controls.push(new Control(model));
			});
			return controls;
		},onError);
	};

	/**
	* gets a control model by id
	*/
	service.getControl = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new Control(model);
		},onError);
	};

	/**
	* creates a new control model
	*/
	service.createControl = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a control model
	*/
	service.updateControl = function (model) {
		return $http.put(url + "/" + model.id, model);
	};

	/**
	* removes a control model
	*/
	service.removeControl = function (id) {
		return $http.remove(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes control service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Control", "_"];