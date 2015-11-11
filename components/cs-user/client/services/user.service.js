
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
	service.getUsers = function () {
		$http.get(url).then(function(models){
			var users = [];
			_.forEach(models, function(model){
				users.push(new User(model));
			});
			return users;
		},onError);
	};

	/**
	* gets a user model by id
	*/
	service.getUser = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new User(model);
		},onError);
	};

	/**
	* creates a new user model
	*/
	service.createUser = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a user model
	*/
	service.updateUser = function (model) {
		return $http.put(url + "/" + model.id, model);
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