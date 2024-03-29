
"use strict";
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initializes module Strip model.
 */
var Schema = new mongoose.Schema({
	_id: { type: String , default: function(){ return uuid.v4();}},
	name: { type: String },
	isActive: { type: Boolean },
	controlId: { type: String },
	parentId: { type: String },
	type: { type: String },
});

/**
 * Duplicates the ID field.
 */
Schema.virtual("id").get(function(){
	return this._id.toString();
});

/**
 * Ensures virtual fields are serialised
 */
Schema.set("toJSON", {
	virtuals: true,
	transform: function (doc, ret, options) {
	   delete ret._id;
	   delete ret.__v;
	}
});

/**
 * Exports module Strip model.
 */
module.exports = mongoose.model("StripModel", Schema);