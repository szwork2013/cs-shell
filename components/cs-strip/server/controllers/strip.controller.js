
/**
 * Initialize module Strip controller.
 */
module.exports = function StripController(Strip) {
    var post = function (req, res) {
        var strip = new Strip({
	        name:req.body.name,
	        isActive:req.body.isActive,
	        controlId:req.body.controlId,
	        parentId:req.body.parentId,
        });

        if (!req.body.name) {
            res.status(400);
            res.send("Strip name is required");
        }
        else {
            strip.save();
            res.status(201);
            res.send(strip);
        }
    };

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Strip.find(query, function (err, strips) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(strips);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
