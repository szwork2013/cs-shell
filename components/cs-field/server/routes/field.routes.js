
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

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.field.hasOwnProperty(prop))
                req.field[prop] = req.body[prop];
        }
        req.field.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.field);
            }
        });
    };

    api.route("/")
        .post(fieldController.post)
        .get(fieldController.get);

    api.use("/:fieldId", function(req, res, next) {
        Field.findById(req.params.fieldId, function(err, field) {
            if (err) {
                res.status(500).send(err);
            } else if (field) {
                req.field = field;
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
            update(req, res);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            update(req, res);
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