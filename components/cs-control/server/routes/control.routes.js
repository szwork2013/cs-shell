
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module Control routes.
 */
module.exports = function(Control, config) {
    var api = express.Router();
    var controlController = require("./../controllers/control.controller")(Control);

    api.route("/")
        .post(controlController.post)
        .get(controlController.get);

    /**
     * Middleware that Finds the Control by and id for PUT, PATCH, DELETE.
     */
    api.use("/:controlId", function(req, res, next) {
        Control.findById(req.params.controlId, function(err, control) {
            if (err) {
                res.status(500).send(err);
            } else if (control) {
                // sets the found control for the downstream;
                req.control = control;
                // moves on to the next middleware;
                next();
            } else {
                res.status(404).send("Control not found");
            }
        });
    });

    api.route("/:controlId")
        .get(function (req, res) {
            res.json(req.control);
        })
        .put(function(req, res) {
            // updates all the properties. Will empty out properties which are not present.
            req.control.name = req.body.name;
            req.control.isActive = req.body.isActive;
            req.control.type = req.body.type;
            req.control.extra1 = req.body.extra1;
            req.control.extra2 = req.body.extra2;
            req.control.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.control);
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
                req.control[prop] = req.body[prop];
            }
            req.control.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.control);
                }
            });
        })
        .delete(function(req, res) {
            req.control.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for control;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}