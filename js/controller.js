/* 
 * use a cookie to track which, if any, tour the user is navigating.
 * call hopscotch with the json tour definition.
 */

var lisTours = {};

(function(){

  var cookie = 'lis-multipage-tour';
  var tourId = Cookies.get(cookie);
  
  if(tourId !== undefined && tourId !== 'changeme') {
    startOrResumeTour(tourId);
  }
  
  this.go = function(tourId) {
    Cookies.set(cookie, tourId);
    startOrResumeTour(tourId);
  }
  
  function startOrResumeTour(tourId) {
    jQuery.getScript('/lis-tours/' + tourId + '/js', function() {
      hopscotch.startTour(tour);
    });
  }
  
}.call(lisTours));



