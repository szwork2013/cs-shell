
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.url + "/strips";
    var api = require("./routes/strip.routes")(require("./models/strip.model"), config);

    // sets api routes for strip;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - 06 - Mounting API Routes: " + base);

    // move to the next api to mount;
    done();
};