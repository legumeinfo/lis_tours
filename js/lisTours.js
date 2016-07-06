"use strict";

/* 
 *  lisTours entry point.
 */

var lisTours = {}; /* the lisTours wrapper/launcher, created by this module */


if(jQuery) {
  //console.log('jQuery version: ' + jQuery.fn.jquery);

  console.log('_jquery version: ' +_jquery.fn.jquery);
  console.log('jQuery version: ' + jQuery.fn.jquery);  
}

if($) {
  console.log('$ version: ' + $.fn.jquery);
}

(function(){
  var that = this;
  var jQuery = $;
  var _jquery = require('jquery').noConflict(true);
  var bootstrapTour = require('../node_modules/build/js/bootstrap-tour-standalone.js');
  var tour = require('../tours/tour1.js');
  
  console.log('$ version in lisTours: '+ $.fn.jquery);
  console.log('jQuery version in lisTours: ' + jQuery.fn.jquery);    
  
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

lisTours.tourLoaded();
