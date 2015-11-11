
"use strict";
/**
 * Initializes module Table controller.
 */
module.exports = function TableController(Table) {
    /**
     * Posts a new table to the database;
     */
    var post = function (req, res) {
        // Sets a new table model;
        var table = new Table({
	        name: req.body.name,
	        isActive: req.body.isActive,
	        stripId: req.body.stripId,
        });
        // Checks if the table model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("Table name is required");
        }
        else {
            table.save();
            res.status(201);
            res.send(table);
        }
    };
    /**
     * Gets a table from the database;
     */
    var get = function (req, res) {
        // Sets up tables to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the tables collection;
        Table.find(query, function (err, tables) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(tables);
            }
        });
    };
    /**
     * Exposes REST methods from the table controller;
     */
    return {
        post: post,
        get: get
    }
}
