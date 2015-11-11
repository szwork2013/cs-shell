
"use strict";
/**
 * Initializes module Strip controller.
 */
module.exports = function StripController(Strip) {
    /**
     * Posts a new strip to the database;
     */
    var post = function (req, res) {
        // Sets a new strip model;
        var strip = new Strip({
	        name: req.body.name,
	        isActive: req.body.isActive,
	        controlId: req.body.controlId,
	        parentId: req.body.parentId,
        });
        // Checks if the strip model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("Strip name is required");
        }
        else {
            strip.save();
            res.status(201);
            res.send(strip);
        }
    };
    /**
     * Gets a strip from the database;
     */
    var get = function (req, res) {
        // Sets up strips to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the strips collection;
        Strip.find(query, function (err, strips) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(strips);
            }
        });
    };
    /**
     * Exposes REST methods from the strip controller;
     */
    return {
        post: post,
        get: get
    }
}
