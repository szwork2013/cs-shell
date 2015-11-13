
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
	service.getControls = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Control(model));
			});
			if(!cb){
				return models;
			}
			else {
				cb(models)
			}			
		},onError);
	};

	/**
	* gets a control model by id
	*/
	service.getControl = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Control(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new control model
	*/
	service.createControl = function (model, cb) {
		$http.post(url, model).then(function(result){
			_.extend(model, result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* updates a control model
	*/
	service.updateControl = function (model, cb) {
		$http.put(url + "/" + model.id, model).then(function(result){
			_.extend(model, result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* removes a control model
	*/
	service.removeControl = function (id) {
		return $http.delete(url + "/" + id);
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