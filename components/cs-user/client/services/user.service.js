
/**
 * Initializes angular component module cs-user service.
 */
module.exports = function($http, api, User, _) {
	// sets url;
	var url = api + "/users";

	// sets up service;
	var service = {};

	/**
	* gets all user models
	*/
	service.getUsers = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new User(model));
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
	* gets a user model by id
	*/
	service.getUser = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new User(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new user model
	*/
	service.createUser = function (model, cb) {
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
	* updates a user model
	*/
	service.updateUser = function (model, cb) {
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
	* removes a user model
	*/
	service.removeUser = function (id) {
		return $http.delete(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes user service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "User", "_"];