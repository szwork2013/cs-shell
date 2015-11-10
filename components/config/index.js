var _ = require("lodash");
var path = require("path");

var root = path.join(__dirname, "./../../");
var sassGlobals = require("./../../framework/client/styles/app.variables");

var isProduction = process.env.NODE_ENV === "production";
var APP_HOST = process.env.APP_HOST || "localhost";
var PORT = !isProduction ? 3000 : process.env.PORT;

var config = {
	isProduction	: isProduction,
	APP_HOST		: APP_HOST,
	PORT			: PORT,
	paths			: {
		base		: root,
		build		: path.join(root, "./.build"),
		bootstrap	: path.join(root, "./bower_components/bootstrap-sass"),
		app			: path.join(root, "./framework/server"),
		www			: path.join(root, "./public"),
		npm			: path.join(root, "./node_modules"),
		bower		: path.join(root, "./bower_components"),
		components	: path.join(root, "./components"),
		views		: path.join(root, "./framework/server/views"),
	},
	folders			: {
		assets		: "/assets/"
	},
	files			: {
		entry		: "framework/index.js",
		index		: "index.html",
		template	: "framework/server/partials/index.tpl.html"
	},
	sass			: {
		vars		: JSON.stringify(sassGlobals),
		globals		: sassGlobals
	},
	api				: {
		url			: "api"
	}
}

_.extend(config, require("./default"));
//_.extend(config, require("./files"));

module.exports = config;