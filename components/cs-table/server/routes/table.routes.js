
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

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.table.hasOwnProperty(prop))
                req.table[prop] = req.body[prop];
        }
        req.table.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.table);
            }
        });
    };

    api.route("/")
        .post(tableController.post)
        .get(tableController.get);

    api.use("/:tableId", function(req, res, next) {
        Table.findById(req.params.tableId, function(err, table) {
            if (err) {
                res.status(500).send(err);
            } else if (table) {
                req.table = table;
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
            update(req, res);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            update(req, res);
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