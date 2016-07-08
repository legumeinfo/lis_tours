"use strict";

/* 
 *  lisTours bundle entry point (index.js).
 */
var lisTours = {}; /* the lisTours library, created by this module */


if(! window.console )
{
  // support console.log on old IE versions, if it doesn't exist    
  require.ensure(['console-shim'], function(require) {
    require('console-shim');
  });
}

(function(){
  var that = this;
  var TOUR_ID_KEY = 'lisTourId';
  var dependenciesLoaded = false;

  /* loadDeps() : use webpack lazy loading to load the dependencies of
   * lisTours only if a tour is requested or tour in progress.
   */
  this.loadDeps = function(cb) {
    console.log('loadDeps()');
    require.ensure(['jquery',
		    '!style!css!../css/bootstrap-tour-standalone.min.css',
		    './bootstrap-tour-loader.js'],
       function(require) {
	 // JQuery: load our version of jquery and stash it in a global
	 // var, taking care not to conflict with existing, older, jquery,
	 // e.g. drupal7 requires jquery 1.4.4 (Bootstrap Tours requires
	 // jquery Deferred/Promise classes)
	 window.__jquery = require('jquery').noConflict(true);
	 // load a customized bootstrap tour js (consumes our __jquery version)
	 require('./bootstrap-tour-loader.js');
	 // load the bootstrap tours css
	 require('!style!css!../css/bootstrap-tour-standalone.min.css');
	 // load a customized bootstrap tour js (consumes our __jquery version)
	 require('./bootstrap-tour-loader.js');
	 // callback fn
	 cb.call(that);
       });
  };
  
  /* go() 
   * force a tour to start at step 0.
   */
  this.go = function(tourId) {
    that.loadDeps(function() {
      var tour = require('../tours/' + tourId +'.js');
      if(! tour) {
	throw 'failed to load tour: ' + tourId;
      }
      tour.init();
      tour.end();
      tour.restart();
      localStorage[TOUR_ID_KEY] = tourId;
    });
  };

  /* resume()
   * restore a tour at whatever step bootstrap tour has retained state. 
   */
  this.resume = function(tourId) {
    console.log('resume()' + tourId);
    that.loadDeps(function() {
      var tour = require('../tours/' + tourId +'.js');
      if(! tour) {
	throw 'failed to load tour: ' + tourId;
      }
      tour.init();
      if(tour.ended()) {
	console.log('removing tour id: ' + tourId) ;
	localStorage.removeItem(TOUR_ID_KEY);
      }
      else {
	var force = true;
	tour.start(force);
      }
    })
  };


  this.init = function() {
    // lookup the most recent tour id, and load it's module, to enable
    // tour to resume automatically.
    var tourId = localStorage.getItem(TOUR_ID_KEY);
    if(tourId) {
      console.log(tourId);
      that.resume(tourId);
    }
  };


  if(jQuery) {
    jQuery('document').ready(this.init);    
  }
  else {
    // lazy load our jquery, if there is not one already.
    require.ensure(['jquery'], function(require) {
      require('jquery');
      jQuery('document').ready(thist.init);
    });
  }
  
}.call(lisTours));

// make the lisTours library available globally
module.exports = lisTours;
window.lisTours = lisTours;
