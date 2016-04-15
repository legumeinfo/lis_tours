// a tour that navigates into a iframed gbrowse
var TOUR_ID = 'tour-gbrowse-example';
var GBROWSE_URL = '/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red';

var tour = {
  id: TOUR_ID,
  steps: [{
    title: 'gbrowse tour',
    content: "let's go",
    target: 'site-name',
    placement: 'bottom',
    multipage: true,
    onNext: function() {
      window.location = GBROWSE_URL;
    }
  }, {
    title: 'gbrowse',
    content: 'first gbrowse element! (loading)...',
    dynamicContent: 'This is the main gbrowse Browser tab',
    target: 'site-name',
    dynamicTarget: function() {
      return jQuery('#frameviewer').contents().find('#main_page_select')[0];
    },
    placement: 'bottom',
    yOffset: jQuery('#frameviewer').length ? jQuery('#frameviewer').offset().top : 0,
    onPrev: function() {
      window.location = '/tours';
    },
    multipage: true,
    onNext: function() {
      var next = hopscotch.getCurrStepNum();
      hopscotch.endTour(false);
      lisTours.go(TOUR_ID, next);
    },
  }, {
    title: 'gbrowse continued',
    content: 'another element in the gbrowse (loading)...',
    dynamicContent: 'This a gbrowse track.',
    placement: 'bottom',
    xOffset: 'center',
    yOffset: jQuery('#frameviewer').length ? jQuery('#frameviewer').offset().top : 0,
    target: 'site-name',
    dynamicTarget:  function() {
      return jQuery('#frameviewer').contents().find('.track')[0];
    },
    multipage: false,
    onNext: function() {
      window.location = '/home';
    }
  }, {
    title: 'to be continued...',
    content: 'like a film',
    target: 'site-name',
    placement: 'bottom',
  }
]};
