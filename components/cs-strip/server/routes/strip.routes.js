
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module Strip routes.
 */
module.exports = function(Strip, config) {
    var api = express.Router();
    var stripController = require("./../controllers/strip.controller")(Strip);

    api.route("/")
        .post(stripController.post)
        .get(stripController.get);

    /**
     * Middleware that Finds the Strip by and id for PUT, PATCH, DELETE.
     */
    api.use("/:stripId", function(req, res, next) {
        Strip.findById(req.params.stripId, function(err, strip) {
            if (err) {
                res.status(500).send(err);
            } else if (strip) {
                // sets the found strip for the downstream;
                req.strip = strip;
                // moves on to the next middleware;
                next();
            } else {
                res.status(404).send("Strip not found");
            }
        });
    });

    api.route("/:stripId")
        .get(function (req, res) {
            res.json(req.strip);
        })
        .put(function(req, res) {
            // updates all the properties. Will empty out properties which are not present.
            req.strip.name = req.body.name;
            req.strip.isActive = req.body.isActive;
            req.strip.controlId = req.body.controlId;
            req.strip.parentId = req.body.parentId;
            req.strip.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.strip);
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
                req.strip[prop] = req.body[prop];
            }
            req.strip.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.strip);
                }
            });
        })
        .delete(function(req, res) {
            req.strip.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for strip;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}