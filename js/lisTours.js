/* 
 * lisTours
 * - use a cookie to track which, if any, tour the user is navigating.
 * - call hopscotch with the javascript tour definition object.
 * - remove the cookie when tour ends.
 */
"use strict";

var lisTours = {};

(function(){
  
  this.cookieId = 'lis-multipage-tour';
  this.tourId = Cookies.get(this.cookieId);
  
  if(this.tourId !== undefined) {
    startOrResumeTour(this.tourId);
  }
  
  this.go = function(tourId) {
    this.tourId = tourId;
    Cookies.set(this.cookieId, tourId);
    startOrResumeTour(tourId, 0);
  }

  function startOrResumeTour(tourId, step) {
    jQuery.getScript('/lis-tours/' + tourId + '/js', function() {
      if(! tour) {
	console.log('failed to load tour: ' + tourId);
	return;
      }
      if(tour.onEnd) {
	console.log('warning: will not clean up cookie after tour ending.');
      }
      else {
	tour.onEnd = function() { Cookies.remove(lisTours.cookieId); };
      }
      if(step !== undefined) {
	hopscotch.startTour(tour, step);
      }
      else {
	hopscotch.startTour(tour);
      }
      var curStep = hopscotch.getCurrStepNum();
      var stepDef = tour.steps[curStep];
      if('dynamicTarget' in stepDef) {
	// expect dynamicTarget to be a jquery selector expression.
	if(jQuery(stepDef.dynamicTarget)[0]) {
	  // the target element exists; expect hopscotch will do the needful.
	  return;
	}
	function waitForSelector() {
	  var el = jQuery(stepDef.dynamicTarget)[0]
	  if(! el) {
	    // selector does not exist, need to wait for dom or dynamic load
	    setTimeout(waitForSelector, 10);
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



