
/**
 * Module dependencies.
 */
var express = require("express");

/**
 * Initialize module User routes.
 */
module.exports = function(User, config) {
    var api = express.Router();
    var userController = require("./../controllers/user.controller")(User);

    var update = function(req, res) {
        for (var prop in req.body) {
            if (req.user.hasOwnProperty(prop))
                req.user[prop] = req.body[prop];
        }
        req.user.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    };

    api.route("/")
        .post(userController.post)
        .get(userController.get);

    api.use("/:userId", function(req, res, next) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send("User not found");
            }
        });
    });

    api.route("/:userId")
        .get(function (req, res) {
            res.json(req.user);
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
            req.user.remove(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

        // sets api default route for user;
        api.get("/index.html", function(req, res) {
            res.send(config.api.welcomeMessage);
        });

    return api;
}