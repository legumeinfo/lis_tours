'use strict';

(function(jQuery) {
  
  var $ = jQuery;
  
  var EXAMPLE_URL  = '/germplasm/map';

  // jquery selectors which are used in the tour definition 
  var SELECTOR = {
    leafletMap: '#map',
    leafletMarker: 'svg g path.leaflet-clickable:last',
    results: '#results-list',
    accession: '#tour-accession-btn',
    locator: '#tour-coords-btn',
    search: '#search-btn',
    filters: '#current-search-filters',
    reframe: '#reframe-btn',
    addMyData: '#add-my-data-btn',
    baseMap: '#change-base-map-btn',
    coords:  '#enter-coords-btn',
    geolocate: '#geolocate-btn',
    mapHeight: '#map-height-btn',
    tour: '#tour-btn',
    menu: '#menu-btn',
  };

  function _showMenu() {
    if(window.angular) {
      if(! $('#menu').length) {
	angular.element('#menu-btn').trigger('click');
      }
      if($('#search-options:visible')) {
	angular.element('#search-cancel').trigger('click');
      }
    }    
  }

  var tour = new Tour({
    name: 'germplasm-map',
    //debug: true,
    template: lisTours.template.defaultTemplate,
    orphan: true,
    steps: [
      {
        title: 'Welcome',
        content: 'This is a short tour of the Germplasm map viewer. This web \
          app offers searching and visualization of germplasm accessions and \
          trait observations. Use the Next button or &#8594; (right arrow key)\
          to advance the tour. Use the Prev button or &#8592; (left arrow key)\
          to step back.',
	onShow: function(tour) {
	  // if the URL is not matching germplasm/map
	  if(document.location.href.indexOf(EXAMPLE_URL) === -1) {
	    console.log('redirecting to: '+ EXAMPLE_URL);
	    document.location.href = EXAMPLE_URL;
	    return (new jQuery.Deferred()).promise();
	  }
	  //return lisTours.waitForSelector(tour, SELECTOR.leafletMap);
	},
        onShown: function (tour) {
          // hide both the search div, and menu div at start of tour.
          if(! $('#menu').length) {
            angular.element('#menu-btn').trigger('click');
          }
          if($('#search-options:visible')) {
            angular.element('#search-cancel').trigger('click');
          }
        }
      },
      {
        title: 'Map Frame',
        content: 'You can drag the map to pan the extent, and use your \
           mouse-wheel to zoom in and out, or use the \
           <span class="glyphicon glyphicon-plus"></span> / \
           <span class="glyphicon glyphicon-minus"></span> zoom buttons \
           (The same as google maps and many other web maps). Try it!',
        element: SELECTOR.leafletMap,
        placement: 'bottom',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.leafletMap).promise();
	}
      },
      {
        title: 'Map Markers',
        content: 'Click on a circular map marker to select this accession and \
get more details. Try it! Map markers are colored by genus, and \
within each genus the hue is darker or lighter for the various \
species.',
        element: SELECTOR.leafletMarker,
        placement: 'bottom',
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.leafletMarker).promise();
	}
      },
      {
        title: 'Results Table',
        content: 'The accessions shown here are automatically coordinated with the \
search results, and with the map frame.',
        element: SELECTOR.results,
        placement: 'top',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.results).promise();
	}
      },
      {
        title: 'Accession Id Buttons',
        content: 'Click on an accession id button to get more details, including \
links out to search other resources. Try it!',
        element: SELECTOR.accession,
        placement: 'top',
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.accession).promise();
	}
      },
      {
        title: 'Locator Buttons',
        content: 'Click on the \
<span class="glyphicon glyphicon-map-marker"></span> \
location icon to select, center and reveal this accession on the map.\
Try it!',
        element: SELECTOR.locator,
        placement: 'top',
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.locator).promise();
	}
      },
      {
        title: 'Set Search Parameters',
        content: 'Click on the Search button to reveal search settings. \
The Taxon Search may be plain text or use logical \
AND (&amp;) and OR (|) operators. For example <br/> \
<code>Arachis hypogaea</code> or <br/>\
<code>sylvestris | burchellii</code> or <br/>\
<code>medicago &amp; brevispina</code>.\
You may click OK to close the search parameters panel.',
        element: SELECTOR.search,
        placement: 'top',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.search).promise();
        },
      },
      {
        title: 'Your Search Filters',
        content: 'Your current search filters are always listed here. You can \
click the  <span class="glyphicon glyphicon-remove"></span> to \
remove any filter. Your map view and results listing are updated \
automatically. Try it!',
        element: SELECTOR.filters,
        placement: 'top',
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.filters).promise();
	}
      },
      {
        title: 'Reframe map',
        content: 'If you want to zoom in on the current list of  \
accessions, use this button.',
        element: SELECTOR.reframe,
        placement: 'bottom',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.reframe).length > 0);	      
	    }).promise();
	}
      },
      {
        title: 'Add my data',
        content: 'You can add your own CSV or delimited text data ' +
          'to the map viewer, using this tool.',
        element: SELECTOR.addMyData,
        placement: 'bottom',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.addMyData).length > 0);
	    }).promise();
	}
      },
      {
        title: 'Change Base Map',
        content: 'You can adjust the base map for a different \
          appearance, if desired. This does not affect your search \
          results!',
        element: SELECTOR.baseMap,
        placement: 'bottom',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.baseMap).length > 0);
	    }).promise();
	}	
      },
      {
        title: 'Geographic Coordinates',
        content: 'Click this button to view the current center of the \
map in latitude and longitude. Or enter new coordinates to go\
there. Remember: the search results are updated automatically.',
        element: SELECTOR.coords,
        placement: 'bottom',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.coords).length > 0);
	    }).promise();
	}
      },
      {
        title: 'Geolocate',
        content: 'Click this button to go to your current geolocation \
(note: you may be prompted to allow this request by your \
browser). Remember: the search results are updated automatically.',
        element: SELECTOR.geolocate,
        placement: 'left',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.geolocate).length > 0);
	    }).promise();
	}
      },
      {
        title: 'Map Height',
        content: 'You can adjust the map vertical appearance by using \
this tool.',
        element: SELECTOR.mapHeight,
        placement: 'left',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.mapHeight).length > 0);
	    }).promise();
	}	
      },
      {
        title: 'Revisit this tour',
        content: 'Click this button anytime to re-open this tour of \
the web app!',
        element: SELECTOR.tour,
        placement: 'left',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForContent(
	    tour,
	    function() {
	      _showMenu();
	      return ($(SELECTOR.tour).length > 0);
	    }).promise();
	},
	onNext: function(tour) {
	  $(SELECTOR.menu).trigger('click');
	}
      },
      {
        title: 'Menu',
        content: 'Hide/Show the options menu with this button. Congratulations,\
            you have completed the tour!',
        element: SELECTOR.menu,
        placement: 'left',
	reflex: true,
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.menu).promise();
	}
      }      
    ]
  });

  lisTours.register(tour);

}(window.__jquery));
