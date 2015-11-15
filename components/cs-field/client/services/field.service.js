
/**
 * Initializes angular component module cs-field service.
 */
module.exports = function($http, api, Field, _, uuid) {

	/**
	* setups the field url.
	*/
	var url = api + "/fields";

	/**
	* setups the field service.
	*/
	var service = {};
	
	/**
	* creates a new field model.
	*/
	service.newField = function(){
		var field = new Field();
		field.id = uuid.v4();
		field.$state = "new";
		return field;
	}

	/**
	* gets all field models
	*/
	service.getFields = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Field(model));
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
	* gets a field model by id
	*/
	service.getField = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Field(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new field model
	*/
	service.createField = function (model, cb) {
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
	* updates a field model
	*/
	service.updateField = function (model, cb) {
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
	* removes a field model
	*/
	service.removeField = function (id, cb) {
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
	* exposes the field service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Field", "_", "uuid"];