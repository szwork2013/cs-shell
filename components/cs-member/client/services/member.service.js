
/**
 * Initializes angular component module cs-member service.
 */
module.exports = function($http, api, Member) {
	// sets url;
	var url = api + "/members";

	// sets up service;
	var service = {};

	/**
	* gets all member models
	*/
	service.getMembers = function () {
		$http.get(url).then(function(models){
			var members = [];
			models.forEach(function(model){
				members.push(new Member(model));
			});
			return members;
		},onError);
	};

	/**
	* gets a member model by id
	*/
	service.getMember = function (id) {
		$http.get(url + "/" + id).then(function(model){
			return new Member(model);
		},onError);
	};

	/**
	* creates a new member model
	*/
	service.createMember = function (model) {
		return $http.post(url, model);
	};

	/**
	* updates a member model
	*/
	service.updateMember = function (model) {
		return $http.put(url + "/" + model.id, model);
	};

	/**
	* removes a member model
	*/
	service.removeMember = function (id) {
		return $http.remove(url + "/" + id);
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
module.exports.$inject = ["$http", "Api", "Member"];