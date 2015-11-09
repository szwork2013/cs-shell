
/**
 * Initialize module Member controller.
 */
module.exports = function MemberController(Member) {
    var post = function (req, res) {
        var member = new Member({
            name: req.body.name,
            type: req.body.type
        });

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

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Member.find(query, function (err, members) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(members);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
