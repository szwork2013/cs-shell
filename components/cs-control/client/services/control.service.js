
/**
 * Initializes angular component module cs-control service.
 */
module.exports = function($http, api, Control, _, uuid) {

	/**
	* setups the control url.
	*/
	var url = api + "/controls";

	/**
	* setups the control service.
	*/
	var service = {};
	
	/**
	* creates a new control model.
	*/
	service.newControl = function(){
		var control = new Control();
		control.id = uuid.v4();
		control.$state = "new";
		return control;
	}

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
	service.removeControl = function (id, cb) {
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
	* exposes the control service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Control", "_", "uuid"];