
"use strict";
/**
 * Initializes module Member controller.
 */
module.exports = function MemberController(Member) {
    /**
     * Posts a new member to the database;
     */
    var post = function (req, res) {
        // Sets a new member model;
        var member = new Member({
	        name: req.body.name,
	        isActive: req.body.isActive,
	        userId: req.body.userId,
	        stripId: req.body.stripId,
	        organisationId: req.body.organisationId,
	        privileges: req.body.privileges,
	        state: req.body.state,
        });
        // Checks if the member model has a name;
        if (!req.body.name) {
            res.status(400);
            res.send("Member name is required");
        }
        else {
            member.save();
            res.status(201);
            res.send(member);
        }
    };
    /**
     * Gets a member from the database;
     */
    var get = function (req, res) {
        // Sets up members to query by name; 
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }
        // Queries the members collection;
        Member.find(query, function (err, members) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(members);
            }
        });
    };
    /**
     * Exposes REST methods from the member controller;
     */
    return {
        post: post,
        get: get
    }
}
