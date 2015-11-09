
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module Field model.
 */
module.exports = mongoose.model("FieldModel", new mongoose.Schema({
	_id: { type: String , default: uuid.v4()},
	name: { type: String },
	isActive: { type: Boolean },
	type: { type: String },
	tableId: { type: String },
}));

