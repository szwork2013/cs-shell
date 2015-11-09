
/**
 * defines angular module cs-member dependencies.
 */
require("./styles/member.scss");

/**
* configures angular module cs-member.
*/
module.exports = function csMember(angular){
    var member = angular.module("cs.member", []);
    member.config(require("./configs/member.routes"));
    member.run(require("./configs/member.run"));

    member.controller("MemberCardController", require("./controllers/member.card.controller"));
    member.controller("MemberListController", require("./controllers/member.list.controller"));
    member.controller("MemberGridController", require("./controllers/member.grid.controller"));
    member.controller("MemberFormController", require("./controllers/member.form.controller"));
    member.controller("MemberPageController", require("./controllers/member.page.controller"));

    member.directive("csMemberCard", require("./directives/member.card.directive"));
    member.directive("csMemberList", require("./directives/member.list.directive"));
    member.directive("csMemberGrid", require("./directives/member.grid.directive"));
    member.directive("csMemberForm", require("./directives/member.form.directive"));

    member.service("MemberService", require("./services/member.service"));
    member.factory("Member", require("./services/member"));

    return member;
}