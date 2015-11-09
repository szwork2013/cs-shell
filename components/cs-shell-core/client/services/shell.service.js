
/**
 * Initializes angular component module cs-shell-core service.
 */
module.exports = function csShellCore(postal, uuid) {
	function newId(){
		uuid.v4(); 
	}
	function info(mgs){
		
	}
	function dialog(options){
		return true;
	}
	return {
		postal: postal,
		dialog: dialog,
		info: info,
		newId: newId
	}	
}
module.exports.$inject = ["postal","uuid"];