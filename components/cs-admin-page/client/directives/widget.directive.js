/**
 * Initialize directive rd-widget.
 */
module.exports = function rdWidget() {
    var directive = {
        transclude: true,
        template: "<div class=\"widget\" ng-transclude></div>",
        restrict: "EA"
    };
    return directive;
};