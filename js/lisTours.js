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
      hopscotch.startTour(tour, step);
    });
  }
  
}.call(lisTours));



