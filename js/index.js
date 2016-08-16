/*

 lisTours bundle entry point (index.js). use webpack lazy loading to
  load the dependencies of lisTours: jquery and
  bootstrap-tour-standalone.

 */
'use strict';

var lisTours = {}; /* the lisTours library, created by this module */

(function(){
  var that = this;
  var TOUR_ID_KEY = 'lisTourId';
  var VISITED_KEY = 'lisTourVisited';
  var MS = 10; /* interval for checking on dynamic content */
  var MAX_MS = 10000;
  var dependenciesLoaded = false;
  var $ = null;

  if(! window.console )
  {
    // support console.log on old IE versions, if it doesn't exist
    require.ensure(['console-shim'], function(require) {
      require('console-shim');
    });
  }

  this.template = {
    defaultTemplate: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><div class="btn-group"><button class="btn btn-sm btn-default" data-role="prev">&#8592;Prev</button><button class="btn btn-sm btn-default" data-role="next">Next&#8594;</button></div><button class="btn btn-sm btn-default" data-role="end">End tour</button></div></div>',
    noPrevBtnTemplate: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><div class="btn-group"><button class="btn btn-sm btn-default" data-role="next">Next&#8594;</button></div><button class="btn btn-sm btn-default" data-role="end">End tour</button></div></div>',
  };
  
  this._loadDeps = function(cb) {

    function loader() {
      // lazy-load bootstrap-tour-standalone (includes bootstrap reqs)
      require.ensure(
	['!style!css!../css/bootstrap-tour-standalone.min.css',
	 '!style!css!../css/lis-tours.css',
	 './bootstrap-tour-standalone-loader.js',
	 './tours/index.js'],
	function(require) {
	  console.log('loading bootstrap-standalone-tour');
	  require('!style!css!../css/bootstrap-tour-standalone.min.css');
	  require('!style!css!../css/lis-tours.css');
	  require('./bootstrap-tour-standalone-loader.js');
	  require('./tours/index.js');
	  cb.call(that);		  
	});
    }
    
    // lazy load the latest jquery
    require.ensure(['jquery'], function(require) {
      $ = window.__jquery = require('jquery').noConflict(true);
      $(document).ready(loader);
    });
  };
  
  /* go() : force a tour to start at step 0, or the specific step num.
   */
  this.go = function(tourId, stepNum) {
    that._loadDeps(function() {
      var tour = that.tours[tourId];
      if(! tour) {
        localStorage.removeItem(TOUR_ID_KEY);
        throw 'failed to load tour id: ' + tourId;
      }
      tour.init();
      tour.end();
      tour.restart(true);
      if(stepNum) {
        tour.goTo(stepNum);
      }
      localStorage[TOUR_ID_KEY] = tourId;
      _visited(tourId);
    });
  };

  // active() : check for existence of a tour id
  this.active = function() {
    return (localStorage[TOUR_ID_KEY]);
  };
  
  function _visited(tourId) {
    var j = localStorage.getItem(VISITED_KEY) || '{}';
    var visited = JSON.parse(j);
    visited[tourId] = true;
    j = JSON.stringify(visited);
    localStorage.setItem(VISITED_KEY, j);
  }

  /* resume() : restore a tour at whatever step bootstrap tour has
   * retained state.
   */
  this.resume = function(tourId) {
    that._loadDeps(function() {
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
  this.waitForSelector = function(tour, jquerySelector, timeout) {
    if(! tour) { throw 'tour parameter required'; }
    if(! jquerySelector) { throw 'jquerySelector parameter required'; }
    console.log(jquerySelector);
    return that.waitForContent(
      tour,
      function() {
	return ($(jquerySelector).length > 0);
      },
      timeout);
  };

  /* waitForContent(): provide a callback function which will resolve
   * a deferred when the callback returns truthy. Useful for onShow()
   * and onShown() for example.
   */
  this.waitForContent = function(tour, cb, timeout) {
    if(! tour) { throw 'tour parameter required'; }
    if(! cb) { throw 'callback parameter required'; }
    var deferred = new $.Deferred();
    var elapsed = 0;
    var maxMs = timeout || MAX_MS;

    function waiter() {
      var res = cb();
      if(res) {
        deferred.resolve();
        return;
      }
      else {
        elapsed += MS;
        if(elapsed >= maxMs) {
          tour.end();
          throw 'error: dynamic content timeout ' + elapsed + ' ms : ' + cb;
        }
        console.log('waiting for dynamic content from callback ' + cb);
        setTimeout(waiter, MS);
      }
    }
    setTimeout(waiter, MS);
    return deferred;
  };

  /* init() : lookup the most recent tour id, and load it's module, to
   * enable tour to resume automatically.
   */
  this._init = function() {
    var tourId = localStorage.getItem(TOUR_ID_KEY);
    if(tourId) {
      that.resume(tourId);
    }
  };

  function _jQueryRequired() {
    if (! window.jQuery) {
      return true;
    }
    try {
      var version = parseFloat(window.jQuery.fn.jquery);
      console.log('existing jquery: ' + window.jQuery.fn.jquery);
      var required = (version < JQUERY_MIN_VER || version > JQUERY_MAX_VER);
      return required;
    }
    catch(e) {
      return true;
    }
  }

  this._init();
  
}.call(lisTours));

// make the lisTours library available globally
module.exports = lisTours;
window.lisTours = lisTours;
//console.log('lisTours loaded');
