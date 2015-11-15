
/**
 * Initializes angular component module cs-table service.
 */
module.exports = function($http, api, Table, _, uuid) {

	/**
	* setups the table url.
	*/
	var url = api + "/tables";

	/**
	* setups the table service.
	*/
	var service = {};
	
	/**
	* creates a new table model.
	*/
	service.newTable = function(){
		var table = new Table();
		table.id = uuid.v4();
		table.$state = "new";
		return table;
	}

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
	service.removeTable = function (id, cb) {
		$http.delete(url + "/" + id).then(function(result){
			if(!cb){
				return;
			}
			else {
				cb()
			}
		},onError);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes the table service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Table", "_", "uuid"];