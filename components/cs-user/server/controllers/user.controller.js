
/**
 * Initialize module User controller.
 */
module.exports = function UserController(User) {
    var post = function (req, res) {
        var user = new User({
            name: req.body.name,
            type: req.body.type
        });

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

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        User.find(query, function (err, users) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(users);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
