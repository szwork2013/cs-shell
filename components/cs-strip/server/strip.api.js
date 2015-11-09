
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/strips";
    var api = require("./routes/strip.routes")(require("./models/strip.model"), config);

    // sets api routes for strip;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Strips");

    // move to the next api to mount;
    done();
};