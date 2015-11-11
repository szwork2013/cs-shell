
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module User model.
 */
module.exports = mongoose.model("UserModel", new mongoose.Schema({
	_id: { type: String , default: function(){uuid.v4();}},
	name: { type: String },
	isActive: { type: Boolean },
	email: { type: String },
	password: { type: String },
	file: { type: String },
	dob: { type: Date },
	city: { type: String },
}));