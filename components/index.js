
/**
* Initializes module apis.
*/
var apis = [];
    apis.push(require("./cs-user/server/user.api"));
    apis.push(require("./cs-field/server/field.api"));
    apis.push(require("./cs-strip/server/strip.api"));
    apis.push(require("./cs-control/server/control.api"));
    apis.push(require("./cs-table/server/table.api"));
    apis.push(require("./cs-member/server/member.api"));
    apis.push(require("./cs-organisation/server/organisation.api"));
module.exports = apis;