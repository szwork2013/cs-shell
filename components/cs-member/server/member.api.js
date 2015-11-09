
/**
 * Initialize api routes.
 */
module.exports = function(app, config, logger, done){
    // sets base url;
    var base = "/" + config.api.URL + "/members";
    var api = require("./routes/member.routes")(require("./models/member.model"), config);

    // sets api routes for member;
    app.use(base, api);

    // logging debug message to the console;
    console.log("App / Booting - API Routes - Members");

    // move to the next api to mount;
    done();
};