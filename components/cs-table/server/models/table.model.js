
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module Table model.
 */
module.exports = mongoose.model("TableModel", new mongoose.Schema({
	_id: { type: String , default: function(){uuid.v4();}},
	name: { type: String },
	isActive: { type: Boolean },
	stripId: { type: String },
}));