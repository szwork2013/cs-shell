
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/tables";
    var api = require("./routes/table.routes")(require("./models/table.model"), config);

    // sets api routes for table;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Tables");

    // move to the next api to mount;
    done();
};