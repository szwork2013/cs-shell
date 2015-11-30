/**
 * initializes angular controller cs.card.controller.
 */
module.exports = function cardController($scope, cardService){
    // making controller public
    var card = this;

    // defining card states ...
    card.states = {
        normal: -1,
        hidden: 0,
        expanded: 1,
        collapsed: 2
    };

    // setting public properties ...
    card.collapsableFooter = true;
    card.handle = "fa fa-list";

    // setting default value for hidden ...
    card.hideable = true;
    card.hide = function() {
        if (card.form.state !== card.states.hidden) {
            card.form.state = card.states.hidden;
        } else {
            card.form.state = card.states.normal;
        }
    };

    // setting default value for expandable ...
    card.expandable = true;
    card.expand = function() {
        if (card.form.state !== card.states.expanded) {
            card.form.state = card.states.expanded;
        } else {
            card.form.state = card.states.normal;
        }
    };

    // setting default value for collapsable ..,
    card.collapsable = true;
    card.collapse = function() {
        if (card.form.state !== card.states.collapsed) {
            card.form.state = card.states.collapsed;
        } else {
            card.form.state = card.states.normal;
        }
    };    
}
module.exports.$inject = ["$scope", "CardService"];