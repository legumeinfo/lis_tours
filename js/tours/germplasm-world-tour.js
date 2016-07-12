(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: 'germplasm-world-tour',
    debug: true,
    orphan: true,
    steps: [
      {
      	path: '/tours',
      	title: 'Welcome to LIS!',
      	content: 'Let\'s go the legumeinfo.org homepage, where the Germplasm Map (GIS) Tour will begin.<br>Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
      	placement: 'bottom',
      	element: '#site-name',
	reflex: true
      },
      {
	path: '/',
	title: 'Germplasm Map World Tour: Step 2',
	content: 'Next, you will now be redirected to germplasm/map...',
	placement: 'bottom',
      },
      {
	path: '/germplasm/map#?zoom=6&maxRecs=200&taxonQuery=&traitOverlay=&traitScale=global&country=&geocodedOnly=false&traitExcludeUnchar=false&limitToMapExtent&lat=35.87&lng=-109.48&mapHeight=350&baseMap=ESRI%20-%20NatGeo%20(default,%20reference%20map)&ne_lat=38.92522904714054&ne_lng=-97.05322265625&sw_lat=32.694865977875075&sw_lng=-121.904296875',
	title: 'Germplasm Map World Tour: Step 3',
	content: 'Please wait, loading germplasm map viewer...',
	onShown: function(tour) {
	  // wait for dynamic content with a loading dialog.
	  if(tour.skipStep) {
	    tour.skipStep = false;
	    tour.prev();
	    return;
	  }
	  var promise = lisTours.waitForContent(
	    tour,
	    function() {
	      return $('.accdetail-button')[0];
	    });
	  // advance automatically to next step when done loading
	  promise.then(function() {
	    tour.next();
	  });
	  return promise;
	}	
      },
      {
	title: 'Germplasm Map World Tour: Step 4',
	content: 'This button is a some dynamic content. Next we go back to LIS homepage.',
	element: '#search-btn',
	reflex: true,
	onShow: function(tour) {
	  tour.skipStep = true;
	}
      },
      {
	path: '/',
	title: 'Germplasm Map World Tour: Step 5',
	content: 'End of tour'
      }
    ]
  });

  lisTours.register(tour);
  
}(window.__jquery));

