var _ = require("lodash");
var path = require("path");
var root = __dirname;

var config = {
	modules: function(modulePath){
		console.log(root);
		var x = path.join(root, "node_modules", modulePath);
		console.log(x);
		return x;
	}
};

_.extend(config, require("./default"));
_.extend(config, require("./files"));

module.exports = config;