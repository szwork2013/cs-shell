
/**
 * Initialize module Table controller.
 */
module.exports = function TableController(Table) {
    var post = function (req, res) {
        var table = new Table({
            name: req.body.name,
            type: req.body.type
        });

        if (!req.body.name) {
            res.status(400);
            res.send("Table name is required");
        }
        else {
            table.save();
            res.status(201);
            res.send(table);
        }
    };

    var get = function (req, res) {
        var query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Table.find(query, function (err, tables) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(tables);
            }
        });
    };

    return {
        post: post,
        get: get
    }
}
