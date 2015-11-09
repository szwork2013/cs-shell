
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

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.organisation.hasOwnProperty(prop))
                req.organisation[prop] = req.body[prop];
        }
        req.organisation.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.organisation);
            }
        });
    };

    api.route("/")
        .post(organisationController.post)
        .get(organisationController.get);

    api.use("/:organisationId", function(req, res, next) {
        Organisation.findById(req.params.organisationId, function(err, organisation) {
            if (err) {
                res.status(500).send(err);
            } else if (organisation) {
                req.organisation = organisation;
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
            update(req, res);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            update(req, res);
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