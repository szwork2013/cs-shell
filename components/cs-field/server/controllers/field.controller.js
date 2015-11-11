
"use strict";
/**
 * Initializes module Field controller.
 */
module.exports = function FieldController(Field) {
    /**
     * Posts a new field to the database;
     */
    var post = function (req, res) {
        // Sets a new field model;
        var field = new Field({
	        name: req.body.name,
	        isActive: req.body.isActive,
	        type: req.body.type,
	        tableId: req.body.tableId,
        });
        // Checks if the field model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("Field name is required");
        }
        else {
            field.save();
            res.status(201);
            res.send(field);
        }
    };
    /**
     * Gets a field from the database;
     */
    var get = function (req, res) {
        // Sets up fields to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the fields collection;
        Field.find(query, function (err, fields) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(fields);
            }
        });
    };
    /**
     * Exposes REST methods from the field controller;
     */
    return {
        post: post,
        get: get
    }
}
