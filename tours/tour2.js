var tour = {
  id: 'tour2',
  steps : [
    {
      title: 'Phylotree Tour: Welcome to the Legume Information System',
      content: 'Click "next" to go to the Homepage.',
      placement: 'bottom',
      target: 'site-name',
      multipage: true, /* indicates the next step is on a different page */
      onNext: function() {
	window.location = '/home';
      }
    }, {
      title: 'Phylotree Tour: Gene Contexts',
      content: "Let's say we want to find a specific mungbean gene that codes for a Glutathione S-transferase, isozymes that catalyze glutathione to protect important intracellural proteins and nucleic acids from nonpolar xenobiotic substrates. In other words, the transferase uses the glutathione antioxidant to reduce poisonous hydrogen peroxide levels.",
      placement: 'bottom',
      target: function() {
	return jQuery("a:contains('Gene Search')")[0];
      },
      multipage: true, /* indicates the next step is on a different page */
      onNext : function() {
	window.location = '/search/gene';
      }
    }, {
      title: 'Phylotree Tour: Gene Search',
      content: 'Here we would type in our gene\'s description, "Glutathione S-transferase".',
      placement: 'bottom',
      target: 'edit-description',
      multipage: true, /* indicates the next step is on a different page */
      onNext: function() {
	window.location='/search/gene?name=vigra&description=glutathione%20S-transferase';
      }
    }, {
      title: 'Phylotree Tour: Gene name',
      content: "We've entered a description and we want to specify that we're interested in Vigna radiata, or mungbean. The short name is 'vigra'.",
      target: 'edit-name',
      placement: 'bottom',
      onNext: function() {
	lisTours.wakeup();
      },
    }, {
      title: 'Phylotree Tour: Find a good chromosome specimen',
      content: "We've put the query in the proper fields. Now we want \
                 to pick a gene and see its  phylogenetic relationships.",
      placement: 'top',
      target: function() {
	return jQuery("[href='/chado_gene_phylotree_v2/Vradi01g03360.Vradi.ver6']")[0];
      },
      multipage: true, /* indicates the next step is on a different page */
      onNext: function() {
	window.location='/chado_phylotree/phytozome_10_2.59088092?hilite_node=vigra.Vradi01g03360.1';
    }
  }, {
    title: 'Phylotree Tour: Phylotree',
    content: 'Please wait, loading tour...',
    placement: 'right',
    content : 'Here is our gene again, surrounded by its cousins.',
    multipage: false,
    target : function() {
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
    target: 'phylonode_popup_dialog',
    placement: 'right',
    delay: 200, /* the jquery dialog has a 200ms slide animation */
    multipage: true, /* indicates that the next step is on a different page */
    onNext: function() {
      window.location='/lis_context_viewer/index.html#/search/vigra.Vradi01g03360?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome';
    }
  }, {
    // this is a placeholder step to prevent the 'Finish' button from
    // displaying in prev ste.
    title : 'Phylotree Tour: To Be Continued...',
    content : '...',
    target : 'site-name',
    placement: 'bottom',
    onShow: function() {
      // dont actually want the user to see this, if they reload page,
      // for example
      hopscotch.endTour(true);
    },
  }
]};
