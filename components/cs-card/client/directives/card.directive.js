"use strict";
/**
 * Module dependencies.
 */
var angular = require ("angular");

/**
 * Initialize directive cs-card.
 */
module.exports = function csCard($){
	return {
		restrict		: "E",
		template		: require("./../partials/card.html"),
		controller		: "CardController",
		controllerAs	: "card",
		bindToController: true,
		scope			: {
			//hideable: "=?"
			//expandable: "=?",
			//collapsable: "=?",
			//collapsableFooter: "=?",
			//handle:"=?"
			form: "=?"
		},
		transclude		: true,
		replace			: true,		
		link			: function ($scope, element, attrs) {

			// setting card form initial state ...
			if (angular.isUndefined($scope.card.form)) {
				$scope.card.form = {
					state: $scope.card.states.normal,
					data: null
				}
			}

			// toggle card expand state ...
			var toggleExpand = function() {
				var $this = $(element);
				$this.toggleClass("panel-expanded");
				$this.toggleClass("panel-expanded-overlay");
				$this.find(".panel-footer").toggleClass("panel-expanded-footer");

				if ($this.hasClass("panel-expanded")) {
					$this.find("button.btn-expandable>i").removeClass("fa-expand").addClass("fa-contract");
				} else {
					$this.find("button.btn-expandable>i").removeClass("fa-contract").addClass("fa-expand");
				}
			};

			// toggle card collapse state ...
			var toggleCollapse = function() {
				var $this = $(element);
				if (!$this.hasClass("panel-collapsed")) {
					$this.find(".card-body").slideUp();

					if (!attrs.collapsableFooter || attrs.collapsableFooter === true) {
						$this.find(".panel-footer").slideUp();
					}

					$this.addClass("panel-collapsed");
					$this.find("button.btn-collapsable>i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
				} else {
					$this.find(".card-body").slideDown();

					if (!attrs.collapsableFooter || attrs.collapsableFooter===true) {
						$this.find(".panel-footer").slideDown();
					}

					$this.removeClass("panel-collapsed");
					$this.find("button.btn-collapsable>i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
				}
			}; // toggle card hidden state ...
			var toggleHide = function() {
				element.toggleClass("hidden");
			}; // watch card state changes  ...
			$scope.$watch("card.form.state", function (newVal, oldVal) {
				//if (newVal === oldValue) return;

				// process old state ...
				switch (oldVal) {
					case $scope.card.states.hidden:
						toggleHide();
						break;
					case $scope.card.states.expanded:
						toggleExpand();
						break;
					case $scope.card.states.collapsed:
						toggleCollapse();
						break;
					default:
				}

				// process new state ...
				switch (newVal) {
					case $scope.card.states.hidden:
						toggleHide();
						break;
					case $scope.card.states.expanded:
						toggleExpand();
						break;
					case $scope.card.states.collapsed:
						toggleCollapse();
						break;
					default:
				}
			}, true);
		}
	};
}
module.exports.$inject = ["$"];