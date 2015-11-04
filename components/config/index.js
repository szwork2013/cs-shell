var _ = require("lodash");
var config = {};
_.extend(config, require("./default"));
_.extend(config, require("./files"));

module.exports = config;