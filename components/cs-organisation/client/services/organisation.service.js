
/**
 * Initializes angular component module cs-organisation service.
 */
module.exports = function($http, api, Organisation, _) {
	// sets url;
	var url = api + "/organisations";

	// sets up service;
	var service = {};

	/**
	* gets all organisation models
	*/
	service.getOrganisations = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Organisation(model));
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
	* gets a organisation model by id
	*/
	service.getOrganisation = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Organisation(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new organisation model
	*/
	service.createOrganisation = function (model, cb) {
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
	* updates a organisation model
	*/
	service.updateOrganisation = function (model, cb) {
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
	* removes a organisation model
	*/
	service.removeOrganisation = function (id) {
		return $http.delete(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes organisation service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Organisation", "_"];