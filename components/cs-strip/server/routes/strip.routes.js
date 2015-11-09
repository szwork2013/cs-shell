
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

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.strip.hasOwnProperty(prop))
                req.strip[prop] = req.body[prop];
        }
        req.strip.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.strip);
            }
        });
    };

    api.route("/")
        .post(stripController.post)
        .get(stripController.get);

    api.use("/:stripId", function(req, res, next) {
        Strip.findById(req.params.stripId, function(err, strip) {
            if (err) {
                res.status(500).send(err);
            } else if (strip) {
                req.strip = strip;
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
            update(req, res);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            update(req, res);
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