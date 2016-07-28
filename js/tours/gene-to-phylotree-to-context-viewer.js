(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: 'gene-to-phylotree-to-context-viewer',
    debug: true,
    orphan: true,
    steps : [
      {
	path: '/tours',
	title: 'Phylotree Tour: Welcome to LIS!',
	content: 'Let\'s go the legumeinfo.org homepage, where the Phylotree Tour will begin.  Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
	placement: 'bottom',
	element: '#site-name',
	reflex: true,	
      }, {
	path: '/home',
	title: 'Phylotree Tour: Getting started',
	content: "This tour will provide an example of navigating LIS from a gene annotated with a specific function to views of its evolutionary context both with respect to other individual genes as well as to the genomic context in which it occurs.<br> Now press the Gene Search button, or use the Next button or press &#8594;.",
	placement: 'bottom',
	element: "a:contains('Gene Search')",
        reflex: true,
      }, {
	path: '/search/gene',
	title: 'Phylotree Tour: Gene Search',
	content: 'Here we would type in our gene\'s expected description',
	placement: 'bottom',
	element: '#edit-description',
	reflex: true,
	onShown: function(tour) {
          $('#edit-description')[0].value='gamma-glutamyl transpeptidase';
	},
      }, {
	title: 'Phylotree Tour: Gene Search',
	content: 'Then click "Apply" to apply the specified filter to the genes in the result.',
	placement: 'bottom',
	element: '#edit-submit-gene',
	onNext: function() {
          $('#edit-submit-gene')[0].click();
	}
      }, {
        title: 'Phylotree Tour: Gene Search',
        content: 'Waiting for query results...',
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
	      return $('tr.odd:nth-child(1) > td:nth-child(7):contains(\'gamma-glutamyl transpeptidase\')')[0];
	    });
	  // advance automatically to next step when done loading
	  promise.then(function() {
	    tour.next();
	  });
	  return promise;
	}
      }, {
	title: 'Phylotree Tour: Species',
	content: "We've gotten results back for all species with annotated genomes in LIS. Supposing we are initially interested in the genes from Vigna radiata (mungbean), we would specify the five-letter species abbreviation 'vigra', composed of the first three letters of the genus and the first two letters of the species component of the scientific name.",
	onShow: function() {
          $("#edit-abbreviation")[0].value='vigra';
	},
	element: '#edit-abbreviation',
	placement: 'bottom',
	reflex: true,	
	onPrev: function(tour) {
	  tour.skipStep = true;
	}
      }, {
	title: 'Phylotree Tour: Gene Search',
	content: 'Again click "Apply" to apply the added filter to the genes in the result.',
	placement: 'bottom',
	element: '#edit-submit-gene',
	reflex: true,	
	onNext: function() {
          $('#edit-submit-gene')[0].click();
	}
      }, {
	title: 'Phylotree Tour: Find a good chromosome specimen',
	content: "We've put the query in the proper fields. Now we want \
to pick a gene and see its  phylogenetic relationships.",
	placement: 'top',
	element: "#block-system-main > div > div > div.view-content > table > tbody > tr.odd.views-row-first > td.views-field.views-field-gene-family > a",
      }, {
	title: 'Phylotree Tour: Phylotree',
	path: '/chado_phylotree/phytozome_10_2.59088092?hilite_node=vigra.Vradi01g03360.1',
	placement: 'right',
	content : 'Here is our gene again, surrounded by its cousins.',
	element : 
	  /* just looking for .hilite-node here was not going to work. we
	     need to use jquery to find the gene of interest. the dom
	     element looks like this, according to chrome inspect element:
	     <g class="leaf node" ...> <circle ...></circle> <text
	     ...>medtr.Medtr1g090150.1</text> </g>
	     this is one way to do it, there are probably other ways to
	     express the selector w/ css+jquery:
	  */
	  '#phylogram g > :contains("Vradi01g03360.1")',
	onNext: function() {
	  /* trigger click event on the leaf node, to reveal the dialog in
	     the correct location. need workaround for 3d and jquery
	     handling events differently :/
	     http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmatically-in-d3
	  */
	  $.fn.d3Click = function () {
	    this.each(function (i, e) {
	      var evt = new MouseEvent('click');
	      e.dispatchEvent(evt);
	    });
	  };
	  $('#phylogram g > :contains("Vradi01g03360.1")').d3Click();
	}
      }, {
	title: 'Phylotree Tour: Genomic Contexts',
	content: 'Let us follow the link to the Genomic Context Viewer...',
	element: 'phylonode_popup_dialog',
	placement: 'top',
	delay: 200, // the jquery dialog has a 200ms slide animation 
/*
	onNext: function() {
	  lisTours.location('/lis_context_viewer/index.html#/search/vigra.Vradi01g03360?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome');
	}
*/
      }, {
	// this is a placeholder step to prevent the 'Finish' button from
	// displaying in prev ste.
        path : '/lis_context_viewer/index.html#/search/vigra.Vradi01g03360?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome',
	title : 'Phylotree Tour: To Be Continued...',
	content : '...',
	element : 'site-name',
	placement: 'bottom',
	onShow: function() {
	  // dont actually want the user to see this, if they reload page,
	  // for example
	  hopscotch.endTour(true);
	},
      }
    ]
  });


  lisTours.register(tour);
  
}(window.__jquery));


