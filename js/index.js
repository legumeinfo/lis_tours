"use strict";

/*
 *  lisTours bundle entry point (index.js).
 */
var lisTours = {}; /* the lisTours library, created by this module */

(function(){
  var that = this;
  var TOUR_ID_KEY = 'lisTourId';
  var MS = 100;
  //adf: doubled this from previous value to accomodate slow gene searches;
  //maybe there's a better approach.
  var MAX_MS = 20000;
  var dependenciesLoaded = false;
  var $ = null;

  if(! window.console )
  {
    // support console.log on old IE versions, if it doesn't exist
    require.ensure(['console-shim'], function(require) {
      require('console-shim');
    });
  }

  /* loadDeps() : use webpack lazy loading to load the dependencies of
   * lisTours only if a tour is requested or tour in progress.
   */
  this.loadDeps = function(cb) {
    require.ensure(['jquery',
        '!style!css!../css/bootstrap-tour-standalone.min.css',
        '!style!css!../css/lis-tours.css',
        './bootstrap-tour-loader.js',
        './tours/index.js'],
       function(require) {
   // JQuery: load our version of jquery and stash it in a global
   // var, taking care not to conflict with existing, older, jquery,
   // e.g. drupal7 requires jquery 1.4.4 (Bootstrap Tours requires
   // jquery Deferred/Promise classes)
   $ = window.__jquery = require('jquery').noConflict(true);
   // load the bootstrap tours css
   require('!style!css!../css/bootstrap-tour-standalone.min.css');
   require('!style!css!../css/lis-tours.css');
   // load a customized bootstrap tour js (consumes our __jquery version)
   require('./bootstrap-tour-loader.js');
   // load tour definitions
   require('./tours/index.js');
   // callback fn
   cb.call(that);
       });
  };

  /* go() : force a tour to start at step 0, or the specific step num.
   */
  this.go = function(tourId, step) {
    that.loadDeps(function() {
      var tour = that.tours[tourId];
      if(! tour) {
  localStorage.removeItem(TOUR_ID_KEY);
  throw 'failed to load tour id: ' + tourId;
      }
      tour.init();
      if(tour.ended()) {
	tour.restart();
      }
      if(! step) {
	// force re-start
	tour.end();
	tour.start(true);
      }
      else {
	// step num was requested
	tour.start(true);
	tour.goTo(step);
      }
      localStorage[TOUR_ID_KEY] = tourId;
    });
  };

  

  /* resume() : restore a tour at whatever step bootstrap tour has
   * retained state.
   */
  this.resume = function(tourId) {
    that.loadDeps(function() {
      var tour = that.tours[tourId];
      if(! tour) {
  localStorage.removeItem(TOUR_ID_KEY);
  throw 'failed to load tour id: ' + tourId;
      }
      tour.init();
      if(tour.ended()) {
  //console.log('removing tour id: ' + tourId) ;
  localStorage.removeItem(TOUR_ID_KEY);
      }
      else {
  var force = true;
  tour.start(force);
      }
    })
  };

  this.tours = {};

  /* register() : each tour object must register, so we can lookup the
   * tour object by it's tag name.
   */
  this.register = function(tour) {
    var name = tour._options.name;
    that.tours[name] = tour;
  };

  /* waitForSelector() : a wrapper for waitForContent(). Use this to wait for
   * existence of a jquery selector string.
   */
  this.waitForSelector = function(tour, jquerySelector) {
    console.log(jquerySelector);
    return that.waitForContent(tour, function() {
      return ($(jquerySelector).length > 0);
    });
  };

  /* waitForContent(): provide a callback function which will resolve
   * a promise when the callback returns truthy. Useful for onShow()
   * and onShown() for example.
   */
  this.waitForContent = function(tour, cb) {
    var promise = new $.Deferred();
    var elapsed = 0;
    function waiter() {
      var res = cb();
      if(res) {
  promise.resolve();
  return;
      }
      else {
  elapsed += MS;
  if(elapsed >= MAX_MS) {
    tour.end();
    throw 'error: dynamic content timeout ' + elapsed + ' ms : ' + cb;
  }
  console.log('waiting for dynamic content from callback ' + cb);
  setTimeout(waiter, MS);
      }
    }
    setTimeout(waiter, MS);
    return promise;
  };

  /* init() : lookup the most recent tour id, and load it's module, to
   * enable tour to resume automatically.
   */
  this.init = function() {
    var tourId = localStorage.getItem(TOUR_ID_KEY);
    if(tourId) {
      that.resume(tourId);
    }
  };


  if('jQuery' in window) {
    jQuery(document).ready(that.init);
  }
  else {
    // lazy load our jquery, if there is not one already.
    require.ensure(['jquery'], function(require) {
      window.__jquery = require('jquery').noConflict(true);
      window.__jquery(document).ready(that.init);
    });
  }

}.call(lisTours));

// make the lisTours library available globally
module.exports = lisTours;
window.lisTours = lisTours;
//console.log('lisTours loaded');
