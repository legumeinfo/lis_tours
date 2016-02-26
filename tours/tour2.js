"use strict";

var tour = {
  'id': 'tour2',
  'steps' : [ {
    'title': 'Welcome to the Legume Information System',
    'content': 'Click "next" to go to the Homepage.',
    'placement': 'bottom',
    'target': 'site-name',
    'multipage': true,
    'onNext': function() {
     window.location = '/home';}
  }, {
    'title': 'Gene Contexts',
    'content': 'Let us begin by searching for a particular mungbean gene, Vradi08g22420.1.',
    'placement': 'bottom',
    'target': jQuery('#genesearchid')[0],
    'multipage': true,
    'onNext' : function() {
      window.location = '/search/gene';}
  }, {
    'title': 'Gene Search',
    'content': 'Let us look for Vradi08g22420.1.',
    'placement': 'bottom',
    'target': jQuery('#edit-name')[0] || 'site-name',
    'multipage': true,
    'onNext': function() {
	window.location='/search/gene?name=Vradi08g22420';}
  }, {
    'title': 'Input Gene name',
    'content': "We've done it for you. Now we want to see this gene's phylogenetic relationships.",
    'placement': 'bottom',
    'target': jQuery("[href='/chado_gene_phylotree_v2/Vradi08g22420.Vradi.ver6']")[0],
    'multipage': true,
    'onNext': function() {
	window.location='/chado_phylotree/phytozome_10_2.59155167?hilite_node=vigra.Vradi08g22420.1';}
   }, {
    'title': 'Phylotree',
    'content': 'Here is our gene again, surrounded by its cousins.',
    'target': jQuery('.hilite-node')[0],
    'placement': 'right'
   }, {
    'title':  'More Info',
    'content': 'Click here for a tour that focuses on the features of this page.',
    'target': jQuery(".button phylogeny-help phylogeny-help-btn")[0],
    'placement': 'bottom'
   }
]};
