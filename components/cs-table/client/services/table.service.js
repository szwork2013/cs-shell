
/**
 * Initializes angular component module cs-table service.
 */
module.exports = function($http, api, Table) {
	// sets url;
	var url = api + "/tables";

	// sets up service;
	var service = {};

	/**
	* gets all table models
	*/
	service.getTables = function () {
		$http.get(url).then(function(models){
			var tables = [];
			models.forEach(function(model){
				tables.push(new Table(model));
			});
			return tables;
		},onError);
	};

	/**
	* gets a table model by id
	*/
	service.getTable = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new Table(model);
		},onError);
	};

	/**
	* creates a new table model
	*/
	service.createTable = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a table model
	*/
	service.updateTable = function (model) {
		return $http.put(url + "/" + model.id, model);
	};

	/**
	* removes a table model
	*/
	service.removeTable = function (id) {
		return $http.remove(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes table service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Table"];