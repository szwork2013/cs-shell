
/**
 * Initializes angular component module cs-field service.
 */
module.exports = function($http, api, Field, _) {
	// sets url;
	var url = api + "/fields";

	// sets up service;
	var service = {};

	/**
	* gets all field models
	*/
	service.getFields = function () {
		$http.get(url).then(function(models){
			var fields = [];
			_.forEach(models, function(model){
				fields.push(new Field(model));
			});
			return fields;
		},onError);
	};

	/**
	* gets a field model by id
	*/
	service.getField = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new Field(model);
		},onError);
	};

	/**
	* creates a new field model
	*/
	service.createField = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a field model
	*/
	service.updateField = function (model) {
		return $http.put(url + "/" + model.id, model);
	};

	/**
	* removes a field model
	*/
	service.removeField = function (id) {
		return $http.delete(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes field service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Field", "_"];