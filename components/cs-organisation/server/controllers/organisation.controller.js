
"use strict";
/**
 * Initializes module Organisation controller.
 */
module.exports = function OrganisationController(Organisation) {
    /**
     * Posts a new organisation to the database;
     */
    var post = function (req, res) {
        // Sets a new organisation model;
        var organisation = new Organisation({
	        name: req.body.name,
	        isActive: req.body.isActive,
        });
        // Checks if the organisation model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("Organisation name is required");
        }
        else {
            organisation.save();
            res.status(201);
            res.send(organisation);
        }
    };
    /**
     * Gets a organisation from the database;
     */
    var get = function (req, res) {
        // Sets up organisations to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the organisations collection;
        Organisation.find(query, function (err, organisations) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(organisations);
            }
        });
    };
    /**
     * Exposes REST methods from the organisation controller;
     */
    return {
        post: post,
        get: get
    }
}
