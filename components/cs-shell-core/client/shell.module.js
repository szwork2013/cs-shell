/**
 * Initializes angular module component cs-shell-core.
 */
module.exports = function(angular, postal, uuid){
	var shell = angular.module("cs.shell.core",[]);
	shell.service("Shell", require("./services/shell.service.js"));
	shell.value("postal", postal);
	shell.value("uuid", uuid);
	return shell;
}