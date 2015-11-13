
/**
 * Initializes angular component module cs-member service.
 */
module.exports = function($http, api, Member, _) {
	// sets url;
	var url = api + "/members";

	// sets up service;
	var service = {};

	/**
	* gets all member models
	*/
	service.getMembers = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Member(model));
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
	* gets a member model by id
	*/
	service.getMember = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Member(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new member model
	*/
	service.createMember = function (model, cb) {
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
	* updates a member model
	*/
	service.updateMember = function (model, cb) {
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
	* removes a member model
	*/
	service.removeMember = function (id) {
		return $http.delete(url + "/" + id);
	};

	/**
	* on error
	*/
	function onError(error) {
		console.log(error);
	}

	/**
	* exposes member service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Member", "_"];