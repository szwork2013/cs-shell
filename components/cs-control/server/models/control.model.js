
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module Control model.
 */
module.exports = mongoose.model("ControlModel", new mongoose.Schema({
	_id: { type: String , default: function(){uuid.v4();}},
	name: { type: String },
	isActive: { type: Boolean },
	type: { type: String },
	extra1: { type: String },
	extra2: { type: String },
}));