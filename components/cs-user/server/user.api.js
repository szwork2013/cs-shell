
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.url + "/users";
    var api = require("./routes/user.routes")(require("./models/user.model"), config);

    // sets api routes for user;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - 06 - Mounting API Routes: " + base);

    // move to the next api to mount;
    done();
};