
/**
 * Initializes angular component module cs-shell-core service.
 */
module.exports = function csShellCore(postal, uuid, $log, _) {
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
		newId: newId,
		_: _
	}	
}
module.exports.$inject = ["postal","uuid", "$log", "_"];