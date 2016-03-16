"use strict";

/* 
  lisTours

  - use a cookie to track which tour the user is following.
  - call hopscotch with the javascript tour definition object.
  - allow dynamically evaluated tour step targets.
  - remove the cookie when tour ends.

  requirements:

  hopscotch.js and css : cdnjs.cloudflare.com/ajax/libs/hopscotch...
  js.cookie : cdnjs.cloudflare.com/ajax/libs/js-cookie...
  
 */

var lisTours = {};

(function(){

  var that = this; /* http://javascript.crockford.com/private.html */
  var WAIT_MS = 100;
  var COOKIE_ID = 'lis-multipage-tour';

  if(! 'hopscotch' in window) {
    throw('hopscotch is required');
  }
  
  // cleanup existing tours first
  if(hopscotch.getCurrTour()) {
    hopscotch.endTour(false);
  }
 
  this.tourId = Cookies.get(COOKIE_ID);
  
  if(this.tourId !== undefined) {
    startOrResumeTour(this.tourId);
  }

  /* resume the tourId at (optional step number) */
  this.go = function(tourId, atStep) {
    that.tourId = tourId;
    Cookies.set(COOKIE_ID, tourId, { expires: 365 });
    var step = atStep || 0;
    startOrResumeTour(tourId, step);
  };

  this.cleanupCookie = function() {
    // prevent tour from re-appearing on every page load!
    Cookies.remove(COOKIE_ID);
  };

  function startOrResumeTour(tourId, step) {

    var url = '/lis-tours/' + tourId + '/js';
    jQuery.getScript(url, function() {
      if(! tour) {
	throw('failed to load tour: ' + tourId);
      }

      //force the tour to cleanup so user does not see tour re-appear
      //upon every page load.
      tour.onClose = that.cleanupCookie;
      tour.onEnd = that.cleanupCookie;
      
      if(step !== undefined) {
	hopscotch.startTour(tour, step);
      }
      else {
	hopscotch.startTour(tour);
      }
      var curStep = hopscotch.getCurrStepNum();
      var stepDef = tour.steps[curStep];
      if(stepDef && ('dynamicTarget' in stepDef)) {
	// expect dynamicTarget to be a callback returning a dom element
	if(stepDef.dynamicTarget()) {
	  // the dynamicTarget element already exists; expect hopscotch will
	  // do the needful.
	  return;
	}
	function waitForSelector() {
	  var el = stepDef.dynamicTarget();
	  if(! el) {
	    // selector does not exist, need to wait for dom or dynamic load
	    setTimeout(waitForSelector, WAIT_MS);
	    return;
	  }
	  // selector exists; update target and content, then call
	  // hopscotch startTour again
	  tour.steps[curStep].target = el;
	  if('dynamicContent' in stepDef) {
	    stepDef.content = stepDef.dynamicContent;
	  }
	  hopscotch.startTour(tour, curStep);
	}
	waitForSelector();
      }
    });
  }
}.call(lisTours));
