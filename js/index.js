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
  var TOUR_ID_KEY = 'lisTourId';

  /* go() 
   * force a tour to start at step 0.
   */
  this.go = function(tourId) {
    var tour = require('../tours/' + tourId +'.js');
    if(! tour) {
      throw 'failed to load tour: ' + tourId;
    }
    tour.init();
    tour.end();
    tour.restart();
    localStorage[TOUR_ID_KEY] = tourId;
  };

  /* resume()
   * restore a tour at whatever step bootstrap tour has retained state. 
   */
  this.resume = function(tourId) {
    console.log('resume()' + tourId);
    var tour = require('../tours/' + tourId +'.js');
    if(! tour) {
      throw 'failed to load tour: ' + tourId;
    }
    tour.init();
    if(! tour.ended()) {
      var force = true;
      tour.start(force);
    }
  };
  
  $('document').ready(function() {
    // lookup the most recent tour id, and load it's module, to enable
    // tour to resume automatically.
    var tourId = localStorage.getItem(TOUR_ID_KEY);
    if(tourId) {
      that.resume(tourId);
    }
  });
  
}.call(lisTours, window.__jquery));

// make the lisTours library available globally
module.exports = lisTours;
window.lisTours = lisTours;
