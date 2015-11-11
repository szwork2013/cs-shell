
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module Organisation routes.
 */
module.exports = function(Organisation, config) {
    var api = express.Router();
    var organisationController = require("./../controllers/organisation.controller")(Organisation);

    api.route("/")
        .post(organisationController.post)
        .get(organisationController.get);

    /**
     * Middleware that Finds the Organisation by and id for PUT, PATCH, DELETE.
     */
    api.use("/:organisationId", function(req, res, next) {
        Organisation.findById(req.params.organisationId, function(err, organisation) {
            if (err) {
                res.status(500).send(err);
            } else if (organisation) {
                // sets the found organisation for the downstream;
                req.organisation = organisation;
                // moves on to the next middleware;
                next();
            } else {
                res.status(404).send("Organisation not found");
            }
        });
    });

    api.route("/:organisationId")
        .get(function (req, res) {
            res.json(req.organisation);
        })
        .put(function(req, res) {
            // updates all the properties. Will empty out properties which are not present.
            req.organisation.name = req.body.name;
            req.organisation.isActive = req.body.isActive;
            req.organisation.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.organisation);
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
                req.organisation[prop] = req.body[prop];
            }
            req.organisation.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.organisation);
                }
            });
        })
        .delete(function(req, res) {
            req.organisation.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for organisation;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}