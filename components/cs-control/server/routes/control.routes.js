
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

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.control.hasOwnProperty(prop))
                req.control[prop] = req.body[prop];
        }
        req.control.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.control);
            }
        });
    };

    api.route("/")
        .post(controlController.post)
        .get(controlController.get);

    api.use("/:controlId", function(req, res, next) {
        Control.findById(req.params.controlId, function(err, control) {
            if (err) {
                res.status(500).send(err);
            } else if (control) {
                req.control = control;
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
            update(req, res);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            update(req, res);
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