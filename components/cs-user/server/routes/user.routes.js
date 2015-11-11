
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

    api.route("/")
        .post(userController.post)
        .get(userController.get);

    /**
     * Middleware that Finds the User by and id for PUT, PATCH, DELETE.
     */
    api.use("/:userId", function(req, res, next) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.status(500).send(err);
            } else if (user) {
                // sets the found user for the downstream;
                req.user = user;
                // moves on to the next middleware;
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
            // updates all the properties. Will empty out properties which are not present.
            req.user.name = req.body.name;
            req.user.isActive = req.body.isActive;
            req.user.email = req.body.email;
            req.user.password = req.body.password;
            req.user.file = req.body.file;
            req.user.dob = req.body.dob;
            req.user.city = req.body.city;
            req.user.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.user);
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
                req.user[prop] = req.body[prop];
            }
            req.user.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.user);
                }
            });
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