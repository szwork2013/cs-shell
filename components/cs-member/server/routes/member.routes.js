
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

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.member.hasOwnProperty(prop))
                req.member[prop] = req.body[prop];
        }
        req.member.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.member);
            }
        });
    };

    api.route("/")
        .post(memberController.post)
        .get(memberController.get);

    api.use("/:memberId", function(req, res, next) {
        Member.findById(req.params.memberId, function(err, member) {
            if (err) {
                res.status(500).send(err);
            } else if (member) {
                req.member = member;
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
            update(req, res);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            update(req, res);
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