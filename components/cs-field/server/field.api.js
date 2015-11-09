
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/fields";
    var api = require("./routes/field.routes")(require("./models/field.model"), config);

    // sets api routes for field;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Fields");

    // move to the next api to mount;
    done();
};