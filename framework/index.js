/**
 * initializes global variables.
 */
var $ = require("jquery"); 
var angular = require("angular");
var _ = require("lodash");
var config = require("components/config");

/**
 * initializes angular module ag-grid and dependencies.
 */
require("jquery-ui");
require("ag-grid");
require("angular-ui-sortable");
require("modules/ag-grid/dist/ag-grid.css");
require("modules/ag-grid/dist/theme-fresh.css");

/**
 * initializes bootstrap
 */
require("modules/bootstrap-sass/assets/javascripts/bootstrap.js");

/**
 * ng scrollbar
 */
require("modules/ng-scrollbar/dist/ng-scrollbar.js");
require("modules/ng-scrollbar/dist/ng-scrollbar.css");
require("metismenu");

// $(document).ready(function () {
//   // Full height
//   function fix_height() {
//     var heightWithoutNavbar = $("body > #wrapper").height() - 61;
//     $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
// 
//     var navbarHeigh = $("nav.navbar-default").height();
//     var wrapperHeigh = $("#page-wrapper").height();
// 
//     if (navbarHeigh > wrapperHeigh) {
//       $("#page-wrapper").css("min-height", navbarHeigh + "px");
//     }
// 
//     if (navbarHeigh < wrapperHeigh) {
//       $("#page-wrapper").css("min-height", $(window).height() + "px");
//     }
// 
//     if ($("body").hasClass("fixed-nav")) {
//       $("#page-wrapper").css("min-height", $(window).height() - 60 + "px");
//     }
//   }
// 
//   $(window).bind("load resize scroll", function () {
//     if (!$("body").hasClass("body-small")) {
//       fix_height();
//     }
//   })
// 
//   setTimeout(function () {
//     fix_height();
//   })
// });
// 
// // Minimalize menu when screen is less than 768px
// $(function () {
//   $(window).bind("load resize", function () {
//     if ($(this).width() < 769) {
//       $("body").addClass("body-small")
//     } else {
//       $("body").removeClass("body-small")
//     }
//   })
//});

/**
 * initializes angular module cs-app.
 */
require("./client/app.module")($, angular, _, config);