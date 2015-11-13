
/**
 * Initializes angular component module cs-table service.
 */
module.exports = function($http, api, Table, _) {
	// sets url;
	var url = api + "/tables";

	// sets up service;
	var service = {};

	/**
	* gets all table models
	*/
	service.getTables = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Table(model));
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
	* gets a table model by id
	*/
	service.getTable = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Table(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new table model
	*/
	service.createTable = function (model, cb) {
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
	* updates a table model
	*/
	service.updateTable = function (model, cb) {
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
	* removes a table model
	*/
	service.removeTable = function (id) {
		return $http.delete(url + "/" + id);
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
module.exports.$inject = ["$http", "Api", "Table", "_"];