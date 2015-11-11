
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module Field routes.
 */
module.exports = function(Field, config) {
    var api = express.Router();
    var fieldController = require("./../controllers/field.controller")(Field);

    api.route("/")
        .post(fieldController.post)
        .get(fieldController.get);

    /**
     * Middleware that Finds the Field by and id for PUT, PATCH, DELETE.
     */
    api.use("/:fieldId", function(req, res, next) {
        Field.findById(req.params.fieldId, function(err, field) {
            if (err) {
                res.status(500).send(err);
            } else if (field) {
                // sets the found field for the downstream;
                req.field = field;
                // moves on to the next middleware;
                next();
            } else {
                res.status(404).send("Field not found");
            }
        });
    });

    api.route("/:fieldId")
        .get(function (req, res) {
            res.json(req.field);
        })
        .put(function(req, res) {
            // updates all the properties. Will empty out properties which are not present.
            req.field.name = req.body.name;
            req.field.isActive = req.body.isActive;
            req.field.type = req.body.type;
            req.field.tableId = req.body.tableId;
            req.field.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.field);
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
                req.field[prop] = req.body[prop];
            }
            req.field.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.field);
                }
            });
        })
        .delete(function(req, res) {
            req.field.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for field;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}