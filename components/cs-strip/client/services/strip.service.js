
/**
 * Initializes angular component module cs-strip service.
 */
module.exports = function($http, api, Strip, _, uuid) {

	/**
	* setups the strip url.
	*/
	var url = api + "/strips";

	/**
	* setups the strip service.
	*/
	var service = {};
	
	/**
	* creates a new strip model.
	*/
	service.newStrip = function(){
		var strip = new Strip();
		strip.id = uuid.v4();
		strip.$state = "new";
		return strip;
	}

	/**
	* gets all strip models
	*/
	service.getStrips = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Strip(model));
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
	* gets a strip model by id
	*/
	service.getStrip = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Strip(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new strip model
	*/
	service.createStrip = function (model, cb) {
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
	* updates a strip model
	*/
	service.updateStrip = function (model, cb) {
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
	* removes a strip model
	*/
	service.removeStrip = function (id, cb) {
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
	* exposes the strip service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Strip", "_", "uuid"];