var _ = require("lodash");
/**
 * Initialize config.
 */
module.exports = function(app, config, logger, next){
	// 
	// Setup nconf to use (in-order): 
	//   1. Command-line arguments 
	//   2. Environment variables 
	//   3. A file located at 'path/to/config.json' 
	// 
	_.extend(config, require("./../index.json"));
	
	//
	// Flag to continue to the next step;
	//	
	console.log("App / Booting - 00 - Configuration");
	
	next();
}
