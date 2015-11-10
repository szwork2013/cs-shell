
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.url + "/tables";
    var api = require("./routes/table.routes")(require("./models/table.model"), config);

    // sets api routes for table;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - 06 - Mounting API Routes: " + base);

    // move to the next api to mount;
    done();
};