(function(jQuery) {

  var $ = jQuery;
  var GBROWSE = '/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red';
    
  var tour = new Tour({
    name: 'qtl-search-to-gbrowse',
    debug: true,
    orphan: true,
    steps : [
      {
      	path: '/tours',
      	title: 'Welcome to LIS!',
      	content: 'Let\'s go the legumeinfo.org homepage, where the QTL Tour will begin.<br>Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
      	placement: 'bottom',
      	element: '#site-name',
	reflex: true,	
      },
      {
      	path: '/',
      	title: 'QTL Tour: Getting started',
      	content: 'This tour will provide an example of navigating LIS from the genetic location of a published QTL to the associated region of the annotated genome for the species in which it was found.<br> Now press the QTL Search button, or use the Next button or press &#8594;.',
      	placement: 'bottom',
      	element: "[href='/search/qtl']",
	reflex: true,
      },
      {
      	path: '/search/qtl',
      	title: 'QTL Tour: Finding the desired QTL',
      	content: 'All of the QTLs that have been curated into LIS from the literature are displayed in the paged results below, and can be filtered using the search fields above. We entered "Seed yield" in the QTL name field. The Apply button will apply the search parameters. Now press Next or &#8594;',
      	placement: 'bottom',
      	element: '#edit-qtl-name',
	reflex: true,
      	onShown: function(tour) {
      	  $('#edit-qtl-name')[0].value='Seed yield';
      	},
      },
      {
      	path: '/search/qtl?organism=Phaseolus%20vulgaris&trait_class=All&expt_pub_symbol_op=%3D&expt_pub_symbol=&qtl_name_op=%3D&qtl_name=seed%20yield',
      	title: 'QTL Tour: The list of QTL matching the query',
      	content: 'Let us look at the details for a specific "seed yield" QTL.',
      	element: "[href='/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5']",
	reflex: true,
      	placement: 'bottom',
      },
      {
      	path: '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5',
      	title: 'QTL Tour: Information about the selected QTL',
      	content: "The QTL Details link will reveal this QTL's place on the chromosome.",
      	placement: 'right',
      	element: "[href='?pane=qtl_details']",
	reflex: true,
	onNext: function(tour) {	  
	  var el = $("[href='?pane=qtl_details']")[0];
	  if(el) {
	    el.click();
	  }
	}
      },
      {
	path: '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5#pane=qtl_details',
      	title: 'QTL Tour: BM199 = Nearest Marker',
      	content: 'This is the marker that had the strongest association with variation in the trait for this QTL, among those used in the mapping experiment. Since the marker has sequence information associated with it, we can find its position in the genome sequence to find the general region in which the gene responsible for the QTL may be found- note, however that the marker is not guaranteed to be very close to any candidate gene, and you should use this only as a very general guide.',
      	placement: 'right',
      	element: "#tripal_feature-table-base > tbody > tr:nth-child(3) > td > a",
	reflex: true,
	onShow: function(tour) {
	  console.log(location.hash);
	  if(location.hash.indexOf('qtl_details') === -1) {
	    var el = $("[href='?pane=qtl_details']")[0];
	    if(el) {
	      console.log('clicking');
	      console.log(el);
	      el.click();
	    }
	  }
	}
      },
      {
	path: '/node/1360783', /* url must match prev reflex element url */
      	title: 'QTL Tour: Marker Overview',
      	content: 'The "Overview" links to articles and descriptions of the marker. To find this marker on the phaseolus map, we can look under "Marker Positions".',
      	element: "[href='?pane=positions']",
	reflex: true,
      	placement: 'bottom',
	onNext: function(tour) {
	  var el = $("[href='?pane=positions']")[0];
	  if(el) {
	    el.click();
	  }
	}
      },
      {
	path: '/node/1360783#pane=positions',
      	title: 'QTL Tour: Genome Browser',
      	content: 'The linked GBrowse map will show you annotations on the genome.',
      	element: "[href='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red']",
	reflex: true,
      	placement: 'top',
	onShow: function(tour) {
	  console.log(location.hash);
	  if(location.hash.indexOf('positions') === -1) {
	    var el = $("[href='?pane=positions']")[0];
	    if(el) {
	      console.log('clicking');
	      console.log(el);
	      el.click();
	    }
	  }
	}      },
      {
	path: GBROWSE,
	title: 'QTL Tour: GBrowse',
	content: 'Loading GBrowse...',
	placement: 'top',
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
	      return $('#frameviewer').contents().find('#centromere_image')[0];
	    });
	  // advance automatically to next step when done loading
	  promise.then(function() {
	    tour.next();
	  });
	  return promise;
	}
      },
      {
	path: GBROWSE,
	title: 'QTL Tour: GBrowse',
	content: 'GBrowse allows you to visualize syntenic relationships between legumes of your choice. The red bar is the lowest flanking marker for "seed yield".',
	element: '#frameviewer',
	placement: 'top',
	onPrev: function(tour) {
	  tour.skipStep = true;
	}
      },
      {
	path: GBROWSE,
        title: 'QTL Tour: Our track in GBrowse',
        content: 'Also visible is the lowest flanking marker, BM199. All the tracks can be dragged to rearrange them.',
	element: '#frameviewer',
	placement: 'top',
      }, {
	path: GBROWSE,
        title: 'QTL Tour: GBrowse Settings',
        content: 'You can choose which tracks to display through the navigation bar (Select Tracks).',
	element: '#frameviewer',
	placement: 'top'
      },
      {
	path: '/',
	title: 'QTL Tour: Completed',
	content: 'Congratulations, you have finished the QTL Tour! Summary: We navigated LIS from the genetic location of a published QTL to the associated region of the annotated genome for Phaseolus Vulgaris. Now press End Tour.'
      }
    ]
  });

  lisTours.register(tour);
  
}(window.__jquery));
