
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initialize module Member model.
 */
module.exports = mongoose.model("MemberModel", new mongoose.Schema({
	_id: { type: String , default: function(){uuid.v4();}},
	name: { type: String },
	isActive: { type: Boolean },
	userId: { type: String },
	stripId: { type: String },
	organisationId: { type: String },
	privileges: { type: Number },
	state: { type: Boolean },
}));