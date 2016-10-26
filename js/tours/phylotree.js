'use strict';

(function(jQuery) {

  var $ = jQuery;
  
  var EXAMPLE_URL  = '/chado_phylotree/phytozome_10_2.59027108';

  // jquery selectors which are used in the tour definition 
  var SELECTOR = {
    family:           '#base-tripal-data-pane .tripal-data-block-desc',
    phylogram:        '#phylogram svg',
    phylogramNav:     'a:contains("Phylogram")',
    leaf:             '#phylogram .legume-leaf-node:last',
    interior:         '#phylogram .inner circle:first',
    root:             '#phylogram .root circle:first',
    msa:              '#msa-toggle',
    circularDendrogram:'a:contains("Circular Dendrogram")',
    organisms:        'a:contains("Organisms")',
    references:       '#phylotree_references',
    analysis:         '#phylotree_analysis',
    search:           'ul li a[title="Search"]',
  };
  
  var tour = new Tour({
    name: 'phylotree',
    debug: true,
    template: lisTours.template.defaultTemplate,
    orphan: true,
    onShow: function(tour) {
      // if the URL is not matching chado_phylotree/[family]
      if(document.location.href.indexOf('phylotree') === -1) {
				console.log('redirecting to example gene family: '+ EXAMPLE_URL);
				document.location.href = EXAMPLE_URL;
				return (new jQuery.Deferred()).promise();
      }
    },
    steps : [
      {
        title: 'Welcome',
        content: 'This quick tour will acquaint you with the phylogeny tree \
viewer and other resources available in this section. Use the Next \
button or &#8594; (right arrow key) to advance the tour. Use the \
Prev button or &#8592; (left arrow key) to step back.'
      },
      {
        title: 'Gene family name',
        content: 'The Gene family name and description are shown in the \
header. Family descriptions are derived from homology-based  \
functional analysis of the hidden markov model representing the \
known sequences in the family, and include Interpro and Gene \
Ontology identifiers.',
        element: SELECTOR.family,
        placement: 'bottom',
        reflex: true,
      },
      {
        title: 'Phylogram',
				content:  'The phylogram view displays a phylogenetic tree with \
branch spans proportional to the amount of character \
change, including both legumes and selected non-legumes.',
        element: SELECTOR.phylogram,
        placement: 'top',
        reflex: true,
        onShow: function(tour) {
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
					return lisTours.waitForSelector(tour, SELECTOR.leaf).promise();
				},
      },
      {
        title: 'Interior Nodes',
        content: 'The other tree nodes are \'interior\' nodes. Click on \
a (white) interior node to view genomic context and genomic \
distribution for the node\'s sub-tree.',
        element: SELECTOR.interior,
        placement: 'top',
				onShow: function(tour) {
					// this will error out for tiny trees with no interior nodes
					// return lisTours.waitForSelector(tour, SELECTOR.interior);
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
					return lisTours.waitForSelector(tour, SELECTOR.root).promise();
				},
				onNext: function(tour) {
					$(SELECTOR.msa)[0].click();
				}
      },
      {
        title: 'MSA',
        content: 'The Multiple Sequence Alignment for the family \
is available via this button.',
        element: SELECTOR.msa,
        placement: 'top',
				onNext: function(tour) {
					$(SELECTOR.msa)[0].click();
					$(SELECTOR.circularDendrogram)[0].click();
				},  
      },
      {
        title: 'Circular Dendrogram',
        content: 'You can view an alternate representation of the same \
phylogram data via this link. This view will not allow you \
to see the fine details, but does give a concise overview \
of the topology of the tree and how gene content from different \
species is distributed throughout.',
        element: SELECTOR.circularDendrogram,
				placement: 'bottom',
				onPrev: function(tour) {
					$(SELECTOR.msa)[0].click();
					$(SELECTOR.phylogramNav)[0].click();
				},
				onNext: function(tour) {
					$(SELECTOR.organisms)[0].click();
				}
      },
      {
        title: 'Organisms',
        content: 'You can display the membership counts per species in a \
diagram illustrating their relative abundances (helpful for \
very large families)',
        element: SELECTOR.organisms,
        placement: 'bottom',
				onPrev: function(tour) {
					$(SELECTOR.circularDendrogram)[0].click();
				},
				onNext: function(tour) {
					$(SELECTOR.references)[0].click();
				}
      },
      {
        title: 'Cross References',
        content: 'You can access the Phytozome family from which this tree \
was derived via this link.',
        element: SELECTOR.references,
        placement: 'bottom',
				onPrev: function(tour) {
					$(SELECTOR.organisms)[0].click();
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
        element: document.querySelector('.phylogeny-help'),
        placement: 'top'
      }
    ]
  });

  lisTours.register(tour);

}(window.__jquery));
