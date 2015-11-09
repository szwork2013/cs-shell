
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/users";
    var api = require("./routes/user.routes")(require("./models/user.model"), config);

    // sets api routes for user;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Users");

    // move to the next api to mount;
    done();
};