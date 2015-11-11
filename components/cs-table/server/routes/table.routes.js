
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module Table routes.
 */
module.exports = function(Table, config) {
    var api = express.Router();
    var tableController = require("./../controllers/table.controller")(Table);

    api.route("/")
        .post(tableController.post)
        .get(tableController.get);

    /**
     * Middleware that Finds the Table by and id for PUT, PATCH, DELETE.
     */
    api.use("/:tableId", function(req, res, next) {
        Table.findById(req.params.tableId, function(err, table) {
            if (err) {
                res.status(500).send(err);
            } else if (table) {
                // sets the found table for the downstream;
                req.table = table;
                // moves on to the next middleware;
                next();
            } else {
                res.status(404).send("Table not found");
            }
        });
    });

    api.route("/:tableId")
        .get(function (req, res) {
            res.json(req.table);
        })
        .put(function(req, res) {
            // updates all the properties. Will empty out properties which are not present.
            req.table.name = req.body.name;
            req.table.isActive = req.body.isActive;
            req.table.stripId = req.body.stripId;
            req.table.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.table);
                }
            });
        })
        .patch(function(req, res) {
            // only updates the given fields;
            if (req.body._id) {
                // prevents id from being updated;
                delete req.body._id;
            }
            for (var prop in req.body) {
                req.table[prop] = req.body[prop];
            }
            req.table.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.table);
                }
            });
        })
        .delete(function(req, res) {
            req.table.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for table;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}