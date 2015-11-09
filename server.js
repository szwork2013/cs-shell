/* eslint no-console: 0 */
var config = require("components/config");

// 00 + 01 + 02 + 03 +04 05 06
var app = require(config.paths.app);

app.listen(config.PORT, config.APP_HOST, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", config.PORT, config.PORT);
});
