
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module Organisation model.
 */
module.exports = mongoose.model("OrganisationModel", new mongoose.Schema({
	_id: { type: String , default: uuid.v4()},
	name: { type: String },
	isActive: { type: Boolean },
}));

