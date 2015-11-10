
/**
 * Initialize module Field controller.
 */
module.exports = function FieldController(Field) {
    var post = function (req, res) {
        var field = new Field({
	        name:req.body.name,
	        isActive:req.body.isActive,
	        type:req.body.type,
	        tableId:req.body.tableId,
        });

        if (!req.body.name) {
            res.status(400);
            res.send("Field name is required");
        }
        else {
            field.save();
            res.status(201);
            res.send(field);
        }
    };

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Field.find(query, function (err, fields) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(fields);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
