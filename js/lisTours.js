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

  console.log('lisTours.js loading');
  
  var that = this;
  var WAIT_MS = 100;
  var COOKIE_ID = 'lis-multipage-tour';
  var timerId = null;
  
  if(! 'hopscotch' in window) {
    throw('hopscotch is required');
  }
 
  this.tourId = Cookies.get(COOKIE_ID);

  this.cleanup = function() {
    // prevent tour from re-appearing on every page load!
    Cookies.remove(COOKIE_ID);
    if(timerId) {
      // stop wait for dynamicTarget
      clearTimeout(timerId);
    }
  };

  /* updateDynamicTourSteps() : update the dynamic properties for all
   * steps in tour (ideally this will enable previous button and next
   * button navigation over the entire tour) */
  function updateDynamicTourSteps() {
    for(var i = 0; i < tour.steps.length; i++) {
      var step = tour.steps[i];
      console.log('verifying tour step  n=' + i);
      console.log(step);
      if('dynamicTarget' in step) {
	// expect dynamicTarget is callback func returning a dom element.
	var el = step.dynamicTarget();
	if(el) {
	  console.log('found dynamic target step n= ' + i);
	  console.log(el);
	  step.target = el;
	  if('dynamicContent' in step) {
	    step.content = step.dynamicContent;
	  }
	} else {
	  console.log('dynamic target not found, step n=' + i);
	  console.log(step.dynamicTarget);
	}
      }
    }
  }
  
  /* resume the tourId at a specific step number (default is to resume) */
  this.go = function(tourId, stepNum) {

    that.tourId = tourId;
    
    console.log('lisTours.go(' + tourId + ', ' + stepNum + ')');

    // check if hopscotch is in agreement about the current tourid
    var state = hopscotch.getState();
    if(state) {
      console.log('current hopsotch state: '+ state);
      if(state.split(':')[0] !== tourId || stepNum !== undefined) {
	try { hopscotch.endTour(true);  } catch(e) {}
      }
      if(stepNum === undefined) {
	// extract the stepNum from the state object
	stepNum = state.split(':')[1];
	console.log('resuming at step n=' + stepNum);
      }
      if(stepNum === undefined) {
	throw 'failed to resolve stepNum';
      }
    }
    else {
      stepNum = 0;
    }
    
    Cookies.set(COOKIE_ID, tourId, { expires: 365 });
    var url = '/lis-tours/' + tourId + '/js';
    jQuery.getScript(url, function() {
      if(! tour) {
	throw('failed to load tour: ' + tourId);
      }
      // force the tour to cleanup so user does not see tour re-appear
      // upon every page load.
      tour.onClose = that.cleanup;
      tour.onEnd = that.cleanup;

      updateDynamicTourSteps();
      
      var currentStep = tour.steps[stepNum];
      var waitCounter = 0;
      // check/wait for dynamic target in the current target, if there is one.
      if('dynamicTarget' in currentStep) {
	var waitForDynamicTarget = function() {
	  var el = currentStep.dynamicTarget();
	  if(! el) {
	    // selector still does not exist, need to wait for dom to load.
	    console.log('waiting for dynamicTarget function:');
	    console.log(currentStep.dynamicTarget);
	    if(waitCounter++ > 100) {
	      console.log('error: max waitCounter');
	      try { hopscotch.endTour(true);  } catch(e) {}	      
	      return;
	    }
	    timerId = setTimeout(waitForDynamicTarget, WAIT_MS);
	    return;
	  }
	  console.log('found dynamic target element:');
	  console.log(el);
	  updateDynamicTourSteps();
	  hopscotch.startTour(tour, stepNum);
	}
	waitForDynamicTarget();
      }
      else {
	hopscotch.startTour(tour, stepNum);
      }
    });
  }
    
  if(this.tourId !== undefined) {
    console.log(this.tourId);
    this.go(this.tourId);
  }
  else {
    console.log('no tourId');
  }

}.call(lisTours));
