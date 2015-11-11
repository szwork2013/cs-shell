
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module Member routes.
 */
module.exports = function(Member, config) {
    var api = express.Router();
    var memberController = require("./../controllers/member.controller")(Member);

    api.route("/")
        .post(memberController.post)
        .get(memberController.get);

    /**
     * Middleware that Finds the Member by and id for PUT, PATCH, DELETE.
     */
    api.use("/:memberId", function(req, res, next) {
        Member.findById(req.params.memberId, function(err, member) {
            if (err) {
                res.status(500).send(err);
            } else if (member) {
                // sets the found member for the downstream;
                req.member = member;
                // moves on to the next middleware;
                next();
            } else {
                res.status(404).send("Member not found");
            }
        });
    });

    api.route("/:memberId")
        .get(function (req, res) {
            res.json(req.member);
        })
        .put(function(req, res) {
            // updates all the properties. Will empty out properties which are not present.
            req.member.name = req.body.name;
            req.member.isActive = req.body.isActive;
            req.member.userId = req.body.userId;
            req.member.stripId = req.body.stripId;
            req.member.organisationId = req.body.organisationId;
            req.member.privileges = req.body.privileges;
            req.member.state = req.body.state;
            req.member.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.member);
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
                req.member[prop] = req.body[prop];
            }
            req.member.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.member);
                }
            });
        })
        .delete(function(req, res) {
            req.member.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for member;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}