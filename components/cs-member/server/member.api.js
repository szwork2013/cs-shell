
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.url + "/members";
    var api = require("./routes/member.routes")(require("./models/member.model"), config);

    // sets api routes for member;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - 06 - Mounting API Routes: " + base);

    // move to the next api to mount;
    done();
};