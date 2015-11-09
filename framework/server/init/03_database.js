/**
 * Module dependencies.
 * 
 * mongoose			: https://www.npmjs.com/package/mongoose
 * es6-templates	: https://www.npmjs.com/package/es6-templates
 */
var mongoose = require("mongoose");

/**
 * Initialize database.
 */
module.exports = function(app, config, logger, next){
	// compile template into connection string;
	var cn = "mongodb://" + config.database.DB_HOST + ":" + config.database.PORT;
	// load mongodb:
	app.db = mongoose.connect(cn)
	
	//
	console.log("App / Booting - 03 - Database");
	
	// mark as done;
	next();
}