
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.url + "/controls";
    var api = require("./routes/control.routes")(require("./models/control.model"), config);

    // sets api routes for control;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - 06 - Mounting API Routes: " + base);

    // move to the next api to mount;
    done();
};