
/**
 * Initialize module Control controller.
 */
module.exports = function ControlController(Control) {
    var post = function (req, res) {
        var control = new Control({
	        name:req.body.name,
	        isActive:req.body.isActive,
	        type:req.body.type,
	        extra1:req.body.extra1,
	        extra2:req.body.extra2,
        });

        if (!req.body.name) {
            res.status(400);
            res.send("Control name is required");
        }
        else {
            control.save();
            res.status(201);
            res.send(control);
        }
    };

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Control.find(query, function (err, controls) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(controls);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
