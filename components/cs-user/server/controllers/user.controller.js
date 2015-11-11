
"use strict";
/**
 * Initializes module User controller.
 */
module.exports = function UserController(User) {
    /**
     * Posts a new user to the database;
     */
    var post = function (req, res) {
        // Sets a new user model;
        var user = new User({
	        name: req.body.name,
	        isActive: req.body.isActive,
	        email: req.body.email,
	        password: req.body.password,
	        file: req.body.file,
	        dob: req.body.dob,
	        city: req.body.city,
        });
        // Checks if the user model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("User name is required");
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    };
    /**
     * Gets a user from the database;
     */
    var get = function (req, res) {
        // Sets up users to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the users collection;
        User.find(query, function (err, users) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(users);
            }
        });
    };
    /**
     * Exposes REST methods from the user controller;
     */
    return {
        post: post,
        get: get
    }
}
