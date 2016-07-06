"use strict";

/* 
 *  lisTours entry point.
 */

var lisTours = {}; /* the lisTours wrapper/launcher, created by this module */

console.log('jQuery version outside lisTours: ' + jQuery.fn.jquery);

(function(){
  var that = this;
  var $ = jQuery = require('jquery');
  
  console.log('jQuery version inside lisTours: ' + jQuery.fn.jquery);
  console.log('jQuery version inside lisTours: ' + $.fn.jquery);

  this.go = function(tourId) {
    var url = '/lis-tours/'+ tourId + '/js';
    jQuery.getScript(url, that.tourLoaded);
  }

  this.tourLoaded = function() {
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
  
}.call(lisTours));

console.log('jQuery version outside lisTours, after require(): ' +
	    jQuery.fn.jquery);
