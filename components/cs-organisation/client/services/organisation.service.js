
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
	service.getOrganisations = function () {
		$http.get(url).then(function(models){
			var organisations = [];
			_.forEach(models, function(model){
				organisations.push(new Organisation(model));
			});
			return organisations;
		},onError);
	};

	/**
	* gets a organisation model by id
	*/
	service.getOrganisation = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new Organisation(model);
		},onError);
	};

	/**
	* creates a new organisation model
	*/
	service.createOrganisation = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a organisation model
	*/
	service.updateOrganisation = function (model) {
		return $http.put(url + "/" + model.id, model);
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