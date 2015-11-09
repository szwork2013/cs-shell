
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module Strip model.
 */
module.exports = mongoose.model("StripModel", new mongoose.Schema({
	_id: { type: String , default: uuid.v4()},
	name: { type: String },
	isActive: { type: Boolean },
	controlId: { type: String },
	parentId: { type: String },
}));

