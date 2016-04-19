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
    content: 'This is the main gbrowse Browser tab',
    target: function() {
      return jQuery('#frameviewer').contents().find('#main_page_select')[0];
    },
    placement: 'bottom',
    yOffset: jQuery('#frameviewer').length ? jQuery('#frameviewer').offset().top : 0,
    multipage: false,
    onNext: function() {
      lisTours.wakeup();
    },
    onPrev: function() {
      window.location = '/tours';
    },
  }, {
    title: 'gbrowse continued',
    content: 'This a gbrowse track.',
    placement: 'bottom',
    xOffset: 'center',
    yOffset: jQuery('#frameviewer').length ? jQuery('#frameviewer').offset().top : 0,
    target: function() {
      return jQuery('#frameviewer').contents().find('.track')[0];
    },
    multipage: true,
    onNext: function() {
      window.location = '/home';
    },
    onPrev: function() {
      lisTours.wakeup();
    },
  }, {
    title: 'to be continued...',
    content: 'like a film',
    target: 'site-name',
    placement: 'bottom',
    onPrev: function() {
      window.location = GBROWSE_URL;
    },
  }
],
  showPrevButton: true,
  onError: function(e) {
    console.log('error:  ' + e);
  }
};
