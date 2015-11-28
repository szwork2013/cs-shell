/**
 * Initialize directive rd-widget-footer.
 */
module.exports = function rdWidgetFooter() {
    var directive = {
        requires: "^rdWidget",
        transclude: true,
        template: "<div class=\"widget-footer\" ng-transclude></div>",
        restrict: "E"
    };
    return directive;
};