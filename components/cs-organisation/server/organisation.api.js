
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/organisations";
    var api = require("./routes/organisation.routes")(require("./models/organisation.model"), config);

    // sets api routes for organisation;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Organisations");

    // move to the next api to mount;
    done();
};