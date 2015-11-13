
/**
 * Initializes angular component module cs-shell-core service.
 */
module.exports = function csShellCore(postal, uuid, $log) {
	function newId(){
		uuid.v4(); 
	}
	function info(mgs){
		
	}
	function debug(msg){
		$log.debug(msg);
	}
	function dialog(options){
		return true;
	}
	return {
		postal: postal,
		dialog: dialog,
		info: info,
		debug: debug,
		newId: newId
	}	
}
module.exports.$inject = ["postal","uuid", "$log"];