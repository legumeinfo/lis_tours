'use strict';

(function(jQuery) {

  var $ = jQuery;
  
  var EXAMPLE_URL  = '/chado_phylotree/legfed_v1_0.L_S1TY1G';

  // jquery selectors which are used in the tour definition 
  var SELECTOR = {
    family:           '#base-tripal-data-pane .tripal-data-block-desc',
    phylogram:        '#phylogram svg',
    phylogramNav:     'a:contains("Phylogram")',
    leaf:             '#phylogram .legume.leaf:last',
    interior:         '#phylogram .inner circle:first',
    root:             '#phylogram .root circle:first',
    msaButton:        '#msa-toggle',
    msaDialog:        '#msa-dialog',
		taxaButton:       '#taxa-toggle',
		taxaDialog:       '#taxa-dialog',
    references:       '#phylotree_references',
    analysis:         '#phylotree_analysis',
    search:           'ul li a[title="Search"]',
  };

  var tour = new Tour({
    name: 'phylotree',
    //debug: true,
    template: lisTours.template.defaultTemplate,
    orphan: true,
    steps : [
      {
        title: 'Welcome',
        content: 'This quick tour will acquaint you with the phylogeny tree \
viewer and other resources available in this section. Use the Next \
button or &#8594; (right arrow key) to advance the tour. Use the \
Prev button or &#8592; (left arrow key) to step back.',
				onShow: function(tour) {
					// if the URL is not matching chado_phylotree/[family]
					if(document.location.href.indexOf('phylotree') === -1) {
						console.log('redirecting to example gene family: '+ EXAMPLE_URL);
						document.location.href = EXAMPLE_URL;
						return (new $.Deferred()).promise();
					}
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.taxaButton).promise();
				},
				onShown: function(tour) {
					// hide the taxa and msa dialog by default for the tour (they will
					// be opened in steps below)
					if($(SELECTOR.msaDialog).is(':visible')) {
						$(SELECTOR.msaButton)[0].click();
					}
					if($(SELECTOR.taxaDialog).is(':visible')) {
						$(SELECTOR.taxaButton)[0].click();
					}
				}
      },
      {
        title: 'Gene family name',
        content: 'The Gene family name and description are shown in the \
header. Family descriptions are derived from homology-based  \
functional analysis of the hidden markov model representing the \
known sequences in the family, and include Interpro and Gene \
Ontology identifiers.',
				onShow: lisTours.fixHScroll,
        element: SELECTOR.family,
        placement: 'bottom',
        reflex: true,
      },
      {
        title: 'Phylogram',
				content:  'The phylogram view displays a phylogenetic tree with \
branch spans proportional to the amount of character change, including both \
legumes and selected non-legumes.',
        element: SELECTOR.phylogram,
        placement: 'top',
        reflex: true,
        onShow: function(tour) {
					lisTours.fixHScroll();
          return lisTours.waitForSelector(tour, SELECTOR.phylogram).promise();
				}
      },
      {
        title: 'Terminal Nodes',
        content: 'The tree nodes on the right are terminal nodes. \
Click on a (colored) node to see more information about legume \
genes including links to organism, gene, genomic context, and \
various resources and viewers. For example, the genomic context \
viewer shows flanking genes and allows exploration of syntenic \
regions from all included legume genomes.',
        element: SELECTOR.leaf,
        placement: 'top',
				onShow: function(tour) {
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.leaf).promise();
				},
      },
      {
        title: 'Interior Nodes',
        content: 'The other tree nodes are \'interior\' nodes. Click on \
a (white) interior node to view genomic context and genomic distribution \
for the node\'s sub-tree. In addition, you can expand and collapse subtrees \
and you can focus the phylogram to the selected subtree. If you expand, \
collapse, or focus on a subtree, the changes are instantly reflected in the \
taxon view and in the msa view (more about those in a moment).',
        element: SELECTOR.interior,
        placement: 'top',
				onShow: function(tour) {
					// this will error out for tiny trees with no interior nodes
					// return lisTours.waitForSelector(tour, SELECTOR.interior);
					lisTours.fixHScroll();
				},
				onShown: function(tour) {
					var interiorNodes = $(SELECTOR.interior).length;
					if(! interiorNodes) {
						$('h3.popover-title').html('Interior Nodes (Not visible in this tree)');
					}
				}
      },
      {
        title: 'Root Node',
        content: 'The root node is also an interior node, although it \
is colored differently for reference. (Note: this root is \
only one of several possible root choices, and may not be \
the oldest common ancestor. It is the result of midpoint \
rooting of the tree.)',
        element: SELECTOR.root,
        placement: 'bottom',
				onShow: function(tour) {
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.root).promise();
				},
      },
      {
        title: 'Taxa and Legend',
        content: 'The Taxa Dialog shows the taxonomic distribution of the current set  features from the phylogram, and provides a legend for the legumes \
(colored dots). You can access the Taxa Dialog via this button. The Taxa Dialog can be moved or closed if it is obscuring your view.',
        element: SELECTOR.taxaButton,
        placement: 'top',
				onShow: function(tour) {
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.taxaButton).promise();
				},
				onShown: function(tour) {
					// open the taxa dialog if it's not already visible.
					if(! $(SELECTOR.taxaDialog).is(':visible')) {
						$('html,body').attr('scrollTop', 0);
 						$(SELECTOR.taxaButton)[0].click();
					}
				},
      },
      {
        title: 'Taxa and Legend - Dialog',
        content: 'You can click the species names to toggle them on and off. \
You can double-click a species name to filter to only that species. Changes \
are instantly reflected in the phylogram view and in the msa view.',
        element: SELECTOR.taxaDialog,
        placement: 'top',
				onShow: function(tour) {
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.taxaDialog).promise();
				},
				onShown: function(tour) {
					// open the taxa dialog if it's not already visible.
					if(! $(SELECTOR.taxaDialog).is(':visible')) {
						$('html,body').attr('scrollTop', 0);
 						$(SELECTOR.taxaButton)[0].click();
					}
				},
				onNext: function(tour) {
					if($(SELECTOR.taxaDialog).is(':visible')) {
						$(SELECTOR.taxaButton)[0].click();
					}
				}
      },
      {
        title: 'MSA',
        content: 'The Multiple Sequence Alignment for the family is \
available via this button. The MSA Dialog can be moved, or closed if it  \
is obscuring your view.',
        element: SELECTOR.msaButton,
        placement: 'top',
				onShow: function(tour) {
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.msaButton).promise();
				},
				onShown: function(tour) {
					// open the msa dialog if it's not already visible.
					if(! $(SELECTOR.msaDialog).is(':visible')) {
						$('html,body').attr('scrollTop', 0);
						$(SELECTOR.msaButton)[0].click();
					}
				},
      },
      {
        title: 'MSA - Dialog',
        content: 'The MSA Dialog shows the current set of features from \
the phylogram, plus the consensus sequence. You can select one or more \
feature names in the MSA, and they will be hilited in the phylogram view.',
        element: SELECTOR.msaDialog,
        placement: 'top',
				onShow: function(tour) {
					lisTours.fixHScroll();
					return lisTours.waitForSelector(tour, SELECTOR.msaDialog).promise();
				},
				onNext: function(tour) {
					if($(SELECTOR.msaDialog).is(':visible')) {
						$(SELECTOR.msaButton)[0].click();
					}
				}
      },
      {
        title: 'Cross References',
        content: 'You can access the family from which this tree \
was derived via this link.',
        element: SELECTOR.references,
        placement: 'bottom',
				onShow: lisTours.fixHScroll,
				onPrev: function(tour) {
					$(SELECTOR.phylogramNav)[0].click();
				},
				onNext: function(tour) {
					$(SELECTOR.analysis)[0].click();
				}
      },
      {
        title: 'Analysis',
        content: 'You can access the Analysis description and metadata  \
via this link.',
        element: SELECTOR.analysis,
        placement: 'bottom',
				onShow: lisTours.fixHScroll,
				onPrev: function(tour) {
					$(SELECTOR.references)[0].click();
				},
				onNext: function(tour) {
					$(SELECTOR.phylogramNav)[0].click();
				}
      },
      {
        title: 'Gene Family Search',
        content: 'You can search for other gene families via the Search menu.',
        element: SELECTOR.search,
        placement: 'bottom',
				onShow: lisTours.fixHScroll,
				onPrev: function(tour) {
					$(SELECTOR.analysis)[0].click();
				}
      },
      {
        title: 'Getting Help',
        content: 'You can restart this tour anytime from the Gene Family Help \
button. In addition there is a more detailed Help page: \
<a href="/search/phylotree/userinfo" target="_blank" \
style="text-decoration: underline"> \
View more help on searching gene families...</a>',
				onShow: lisTours.fixHScroll,
        element: document.querySelector('.phylogeny-help'),
        placement: 'top'
      }
    ]
  });

  lisTours.register(tour);

}(window.__jquery));
