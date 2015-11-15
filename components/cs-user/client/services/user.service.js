
/**
 * Initializes angular component module cs-user service.
 */
module.exports = function($http, api, User, _, uuid) {

	/**
	* setups the user url.
	*/
	var url = api + "/users";

	/**
	* setups the user service.
	*/
	var service = {};
	
	/**
	* creates a new user model.
	*/
	service.newUser = function(){
		var user = new User();
		user.id = uuid.v4();
		user.$state = "new";
		return user;
	}

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
	service.removeUser = function (id, cb) {
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
	* exposes the user service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "User", "_", "uuid"];