
"use strict";
/**
 * Initializes module Control controller.
 */
module.exports = function ControlController(Control) {
    /**
     * Posts a new control to the database;
     */
    var post = function (req, res) {
        // Sets a new control model;
        var control = new Control({
	        name: req.body.name,
	        isActive: req.body.isActive,
	        type: req.body.type,
	        extra1: req.body.extra1,
	        extra2: req.body.extra2,
        });
        // Checks if the control model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("Control name is required");
        }
        else {
            control.save();
            res.status(201);
            res.send(control);
        }
    };
    /**
     * Gets a control from the database;
     */
    var get = function (req, res) {
        // Sets up controls to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the controls collection;
        Control.find(query, function (err, controls) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(controls);
            }
        });
    };
    /**
     * Exposes REST methods from the control controller;
     */
    return {
        post: post,
        get: get
    }
}
