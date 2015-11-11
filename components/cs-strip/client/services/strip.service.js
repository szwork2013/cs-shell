
/**
 * Initializes angular component module cs-strip service.
 */
module.exports = function($http, api, Strip, _) {
	// sets url;
	var url = api + "/strips";

	// sets up service;
	var service = {};

	/**
	* gets all strip models
	*/
	service.getStrips = function () {
		$http.get(url).then(function(models){
			var strips = [];
			_.forEach(models, function(model){
				strips.push(new Strip(model));
			});
			return strips;
		},onError);
	};

	/**
	* gets a strip model by id
	*/
	service.getStrip = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new Strip(model);
		},onError);
	};

	/**
	* creates a new strip model
	*/
	service.createStrip = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a strip model
	*/
	service.updateStrip = function (model) {
		return $http.put(url + "/" + model.id, model);
	};

	/**
	* removes a strip model
	*/
	service.removeStrip = function (id) {
		return $http.delete(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes strip service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Strip", "_"];