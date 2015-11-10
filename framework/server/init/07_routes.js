/**
 * Module dependencies.
 */
var engine = require("ejs-mate");
var path = require("path");

var routes = require("./../routes/index");
var settings = require("./../routes/settings");

/**
 * Initialize views.
 */
module.exports = function(app, config, logger, next){
	
	//
	app.use("/settings", settings);
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error("Not Found");
		err.status = 404;
		next(err);
	});
	
	// error handlers
	
	// development error handler
	// will print stacktrace
	if (app.get("env") === "development") {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render("error.ejs", {
			message: err.message,
			error: err
			});
		});
	}
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	res.status(err.status || 500);
		res.render("error.ejs", {
			message: err.message,
			error: {}
		});
	});
	
	app.get("*", function response(req, res) {
		res.sendFile(path.join(config.paths.www, "public/index.html"));
	});
	
	console.log("App / Booting - 07 - APP Mounting routes");
	next();
}