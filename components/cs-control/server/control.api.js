
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/controls";
    var api = require("./routes/control.routes")(require("./models/control.model"), config);

    // sets api routes for control;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Controls");

    // move to the next api to mount;
    done();
};