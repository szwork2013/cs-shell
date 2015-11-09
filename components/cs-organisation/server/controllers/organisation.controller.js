
/**
 * Initialize module Organisation controller.
 */
module.exports = function OrganisationController(Organisation) {
    var post = function (req, res) {
        var organisation = new Organisation({
            name: req.body.name,
            type: req.body.type
        });

        if (!req.body.name) {
            res.status(400);
            res.send("Organisation name is required");
        }
        else {
            organisation.save();
            res.status(201);
            res.send(organisation);
        }
    };

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Organisation.find(query, function (err, organisations) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(organisations);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
