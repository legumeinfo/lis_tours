"use strict";

/* 
 *  lisTours bundle entry point (index.js).
 */

// load a newer version of jquery and stash it in a global var, taking
// care not to conflict with existing, older, jqueries.
window.__jquery = require('jquery').noConflict(true);

require('!style!css!../css/bootstrap-tour-standalone.min.css');
require('./bootstrap-tour-loader.js');

var lisTours = {}; /* the lisTours library, created by this module */

(function($){
  var that = this;
  var jQuery = $;
  
  this.go = function(tourId) {
    var tour = require('../tours/' + tourId +'.js');
    if(! tour) {
      throw 'failed to load tour: ' + tourId;
    }
    tour.init();
    if(tour.ended()) {
      tour.restart();
    }
    else {
      var force = true;
      tour.start(force);
    }
  };
  
}.call(lisTours, window.__jquery));

// make the lisTours library available globally
module.exports = lisTours;
window.lisTours = lisTours;
