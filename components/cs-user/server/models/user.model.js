
"use strict";
/**
 * Module dependencies.
 */
var mongoose = require("mongoose");
var uuid = require("uuid");

/**
 * Initializes module User model.
 */
var Schema = new mongoose.Schema({
	_id: { type: String , default: function(){ return uuid.v4();}},
	name: { type: String },
	isActive: { type: Boolean },
	email: { type: String },
	password: { type: String },
	file: { type: String },
	dob: { type: Date },
	city: { type: String },
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
 * Exports module User model.
 */
module.exports = mongoose.model("UserModel", Schema);