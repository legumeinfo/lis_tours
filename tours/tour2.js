var tour = {
  id: 'tour2',
  steps : [
    {
      title: 'Welcome to the Legume Information System',
      content: 'Click "next" to go to the Homepage.',
      placement: 'bottom',
      target: 'site-name',
      multipage: true, /* indicates the next step is on a different page */
      onNext: function() {
	window.location = '/home';
      }
    }, {
      title: 'Gene Contexts',
      content: 'Let us begin by searching for a particular mungbean gene, \
                Vradi08g22420.1.',
      placement: 'bottom',
      target: jQuery('#genesearchid')[0],
      multipage: true, /* indicates the next step is on a different page */
      onNext : function() {
	window.location = '/search/gene';
      }
    }, {
      title: 'Gene Search',
      content: 'Let us look for Vradi08g22420.1.',
      placement: 'bottom',
      target: jQuery('#edit-name')[0] || 'site-name',
      multipage: true, /* indicates the next step is on a different page */
      onNext: function() {
	window.location='/search/gene?name=Vradi08g22420';
      }
    }, {
      title: 'Input Gene name',
      content: "We have searched for Vradi08g22420 for you. Now we want \
                 to see this gene's phylogenetic relationships.",
      placement: 'top',
      target: jQuery("[href='/chado_gene_phylotree_v2/Vradi08g22420.Vradi.ver6']")[0],
      multipage: true, /* indicates the next step is on a different page */
      onNext: function() {
	window.location='/chado_phylotree/phytozome_10_2.59155167?hilite_node=vigra.Vradi08g22420.1';
    }
  }, {
    title: 'Phylotree',
    content: 'Please wait, loading tour...',
    placement: 'right',
    target: 'site-name',
    dynamicContent : 'Here is our gene again, surrounded by its cousins.',
    dynamicTarget : function() {
      /* just looking for .hilite-node here was not going to work. we
       need to use jquery to find the gene of interest. the dom
       element looks like this, according to chrome inspect element:
       <g class="leaf node" ...> <circle ...></circle> <text
       ...>medtr.Medtr1g090150.1</text> </g>
       this is one way to do it, there are probably other ways to
       express the selector w/ css+jquery:
      */
      return jQuery('#phylogram g > :contains("Vradi08g22420")')[0];
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
      jQuery('#phylogram g > :contains("Vradi08g22420")').d3Click();
    }
  }, {
    title: 'Genomic Contexts',
    content: 'Let us follow the link to the Genomic Context Viewer...',
    target: jQuery('#phylonode_popup_dialog')[0] || 'site-name',
    placement: 'right',
    delay: 200, /* the jquery dialog has a 200ms slide animation */
    multipage: true, /* indicates that the next step is on a different page */
    onNext: function() {
      window.location='/lis_context_viewer/index.html#/search/vigra.Vradi08g22420?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome';
    }
  }, {
    // this is a placeholder step to prevent the 'Finish' button from
    // displaying in prev ste.
    title : 'To Be Continued...',
    content : '...',
    target : 'site-name',
  }
]};
