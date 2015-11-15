
/**
 * Initializes angular component module cs-member service.
 */
module.exports = function($http, api, Member, _, uuid) {

	/**
	* setups the member url.
	*/
	var url = api + "/members";

	/**
	* setups the member service.
	*/
	var service = {};
	
	/**
	* creates a new member model.
	*/
	service.newMember = function(){
		var member = new Member();
		member.id = uuid.v4();
		member.$state = "new";
		return member;
	}

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
	service.removeMember = function (id, cb) {
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
	* exposes the member service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Member", "_", "uuid"];