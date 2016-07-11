(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: 'gene-to-phylotree-to-context-viewer',
    debug: true,
    orphan: true,
    steps : [
      {
	path: '/tours',
	title: 'Phylotree Tour: Welcome to the Legume Information System',
	content: 'Click "next" to go to the Homepage.',
	placement: 'bottom',
	element: 'site-name'
      }, {
	path: '/home',
	title: 'Phylotree Tour: Gene Contexts',
	content: "Let's say we want to find genes described as having a particular function.",
	placement: 'bottom',
	element: "a:contains('Gene Search')"
      }, {
	path: '/search/gene',
	title: 'Phylotree Tour: Gene Search',
	content: 'Here we would type in our gene\'s expected description',
	placement: 'bottom',
	element: 'edit-description',
	onShow: function() {
          jQuery('#edit-description')[0].value='gamma-glutamyl transpeptidase';
	},
      }, {
	title: 'Phylotree Tour: Gene Search',
	content: 'Then click "Apply" to apply the specified filter to the genes in the result.',
	placement: 'bottom',
	element: '#edit-submit-gene',
	multipage: true, /* indicates the next step is on a different page */
	onNext: function() {
          jQuery('#edit-submit-gene')[0].click();
	}
      }, {
	title: 'Phylotree Tour: Species',
	content: "We've gotten results back for all species with annotated genomes in LIS. Supposing we are initially interested in the genes from Vigna radiata (mungbean), we would specify the five-letter species abbreviation 'vigra', composed of the first three letters of the genus and the first two letters of the species component of the scientific name.",
	onShow: function() {
          jQuery("#edit-abbreviation")[0].value='vigra';
	},
	element: 'edit-abbreviation',
	placement: 'bottom',
      }, {
      }, {
	title: 'Phylotree Tour: Gene Search',
	content: 'Again click "Apply" to apply the added filter to the genes in the result.',
	placement: 'bottom',
	element: '#edit-submit-gene',
	multipage: true, /* indicates the next step is on a different page */
	onNext: function() {
          jQuery('#edit-submit-gene')[0].click();
	}
      }, {
	title: 'Phylotree Tour: Find a good chromosome specimen',
	content: "We've put the query in the proper fields. Now we want \
to pick a gene and see its  phylogenetic relationships.",
	placement: 'top',
	element: function() {
	  return jQuery("#block-system-main > div > div > div.view-content > table > tbody > tr.odd.views-row-first > td.views-field.views-field-gene-family > a")[0];
	},
	multipage: true, /* indicates the next step is on a different page */
	onNext: function() {
	  lisTours.location('/chado_phylotree/phytozome_10_2.59088092?hilite_node=vigra.Vradi01g03360.1');
	}
      }, {
	title: 'Phylotree Tour: Phylotree',
	content: 'Please wait, loading tour...',
	placement: 'right',
	content : 'Here is our gene again, surrounded by its cousins.',
	multipage: false,
	element : function() {
	  /* just looking for .hilite-node here was not going to work. we
	     need to use jquery to find the gene of interest. the dom
	     element looks like this, according to chrome inspect element:
	     <g class="leaf node" ...> <circle ...></circle> <text
	     ...>medtr.Medtr1g090150.1</text> </g>
	     this is one way to do it, there are probably other ways to
	     express the selector w/ css+jquery:
	  */
	  return jQuery('#phylogram g > :contains("Vradi01g03360.1")')[0];
	},
	onNext: function() {
	  /* trigger click event on the leaf node, to reveal the dialog in
	     the correct location. need workaround for 3d and jquery
	     handling events differently :/
	     http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmatically-in-d3
	  */
	  jQuery.fn.d3Click = function () {
	    this.each(function (i, e) {
	      var evt = new MouseEvent('click');
	      e.dispatchEvent(evt);
	    });
	  };
	  jQuery('#phylogram g > :contains("Vradi01g03360.1")').d3Click();
	}
      }, {
	title: 'Phylotree Tour: Genomic Contexts',
	content: 'Let us follow the link to the Genomic Context Viewer...',
	element: 'phylonode_popup_dialog',
	placement: 'right',
	delay: 200, /* the jquery dialog has a 200ms slide animation */
	multipage: true, /* indicates that the next step is on a different page */
	onNext: function() {
	  lisTours.location('/lis_context_viewer/index.html#/search/vigra.Vradi01g03360?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome');
	}
      }, {
	// this is a placeholder step to prevent the 'Finish' button from
	// displaying in prev ste.
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


