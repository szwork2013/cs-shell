
/**
 * Initializes angular component module cs-organisation service.
 */
module.exports = function($http, api, Organisation, _, uuid) {

	/**
	* setups the organisation url.
	*/
	var url = api + "/organisations";

	/**
	* setups the organisation service.
	*/
	var service = {};
	
	/**
	* creates a new organisation model.
	*/
	service.newOrganisation = function(){
		var organisation = new Organisation();
		organisation.id = uuid.v4();
		organisation.$state = "new";
		return organisation;
	}

	/**
	* gets all organisation models
	*/
	service.getOrganisations = function (cb) {
		$http.get(url).then(function(result){
			var models = [];
			_.forEach(result.data, function(model){
				models.push(new Organisation(model));
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
	* gets a organisation model by id
	*/
	service.getOrganisation = function (id, cb) {
		$http.get(url + "/" + id).then(function(result){
			var model = new Organisation(result.data);
			if(!cb){
				return model;
			}
			else {
				cb(model)
			}
		},onError);
	};

	/**
	* creates a new organisation model
	*/
	service.createOrganisation = function (model, cb) {
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
	* updates a organisation model
	*/
	service.updateOrganisation = function (model, cb) {
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
	* removes a organisation model
	*/
	service.removeOrganisation = function (id, cb) {
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
	* exposes the organisation service
	*/
	return service;
}
module.exports.$inject = ["$http", "Api", "Organisation", "_", "uuid"];