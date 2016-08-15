 (function(jQuery) {

  var $ = jQuery;
  var FOCUS_GENE_FAMILY = 'phytozome_10_2.59088092';
  var FOCUS_GENE = 'vigra.Vradi01g03360';
  var FOCUS_GENE_UNIQUENAME = 'Vradi01g03360.Vradi.ver6';
  var FOCUS_PROTEIN = FOCUS_GENE + '.1';
  var FOCUS_GENE_FUNCTION = 'gamma-glutamyl transpeptidase';
  var SELECTOR = {
    welcome: '#site-name',
    searchBtn: "a:contains('Gene Search')",
    descriptors: 'th.views-field-description',
    formFieldDescr: '#edit-description',
    formFieldAbbrev: '#edit-abbreviation',
    submitBtn: '#edit-submit-gene',
    searchResult: 'th.views-field-name',
    functionalDesc: 'th.views-field-description',
    geneFamilyLink:'a[href*="'+FOCUS_GENE_UNIQUENAME+'"]:contains("'+FOCUS_GENE_FAMILY+'")',
    phylotree: '#phylogram text:contains("'+FOCUS_PROTEIN+'")',
    popup: '#phylonode_popup_dialog',
    contextViewerLink: "#phylonode_popup_dialog a[href*='lis_context_viewer']",
    contextFocusGene: 'path.point.focus:first',
    contextLocus: 'g.legend:has(:contains("phytozome_10_2.59088092"))',
    contextFocus: 'h4:contains("phytozome_10_2.59088092")',
    contextFamilyLink: 'a:contains("View genes in phylogram")',
    contact: 'a:contains("Contact")',
  };

  $.fn.d3Click = function () {
    this.each(function (i, e) {
      var evt = new MouseEvent('click');
      e.dispatchEvent(evt);
    });
  };

  var tour = new Tour({
    name: 'gene-to-phylotree-to-context-viewer',
    keyboard: true,
    debug: true,
    orphan: true,
    // this template should be same as default, except with Prev button removed.
    template: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div><div class="popover-navigation"><div class="btn-group"><button class="btn btn-sm btn-default" data-role="next">Next &#8594;</button></div><button class="btn btn-sm btn-default" data-role="end">End tour</button></div></div>',
    steps : [
      {
        title: 'Gene Tour: Welcome to LIS!',
        content: 'Let\'s go the legumeinfo.org homepage, where the Gene Tour will begin.  Use the Next button or &#8594; (right arrow key) to advance the tour.',
        placement: 'bottom',
        element: SELECTOR.welcome,
        reflex: true,
      }, {
        path: '/home',
        title: 'Gene Tour: Getting started',
        content: "This tour will provide an example of navigating LIS from a gene annotated with a specific function to views of its evolutionary context both with respect to other individual genes as well as to the genomic context in which it occurs.<br> Now press the Gene Search button, or use the Next button or press &#8594;.",
        placement: 'bottom',
        element: SELECTOR.searchBtn,
        reflex: true,
      }, {
        title: 'Gene Tour: Gene Search',
        path: '/search/gene',
        content: 'All the legume genes in LIS have been annotated with functional descriptors based on a consistent set of homology-based methods. We\'ll use gene function as a query to limit the set of genes in the results.',
        placement: 'top',
        element: SELECTOR.descriptors,
        reflex: true,
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'We can enter key terms from the expected description of the gene function in which we\'re interested here.',
        placement: 'bottom',
        element: SELECTOR.formFieldDescr,
        reflex: true,
        onShown: function(tour) {
          $(SELECTOR.formFieldDescr)[0].value=FOCUS_GENE_FUNCTION;
          $('#edit-description-op')[0].value='starts';
        },
      }, {
        title: 'Gene Tour: Filter by Species',
        content: "Supposing we are initially interested in the genes from Vigna radiata (mungbean), we would specify the five-letter species abbreviation 'vigra', composed of the first three letters of the genus and the first two letters of the species component of the scientific name.",
        onShown: function() {
          $(SELECTOR.formFieldAbbrev)[0].value='vigra';
        },
        element: SELECTOR.formFieldAbbrev,
        placement: 'bottom',
        reflex: true,
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'Then click "Apply" to apply the specified filters to the genes in the result.',
        placement: 'bottom',
        element: SELECTOR.submitBtn,
        reflex: true,
        onNext: function() {
          $(SELECTOR.submitBtn)[0].click();
        }
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'Please be patient, as we wait for the query results to be returned...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $('tr.views-row-first td.views-field-description:contains("'+FOCUS_GENE_FUNCTION+'")')[0];
            }, 40000);
          // advance automatically to next step when done loading
          promise.then(function() {
            tour.next();
          });
          return promise;
        }
      }, {
        title: 'Gene Tour: Search Results',
        content: "We've gotten paged results back for genes matching the given description in our target species.",
        element: SELECTOR.searchResult,
        placement: 'top',
        reflex: true,
       }, {
     title: 'Gene Tour: Functional description',
     content: "Notice that there is a subtle difference in the annotation of the genes, though they are all listed as belonging to the same gene family.",
     placement: 'top',
     element: SELECTOR.functionalDesc,
     reflex: true,
      }, {
        title: 'Gene Tour: Gene Family',
        content: "Following the link to the gene family will show you this gene in the context of a tree representing the orthologous, paralogous and homoeologous members of the family.",
        placement: 'left',
	reflex: false, // NB dont use reflex, because of absolute link to legumeinfo.org,
        element: SELECTOR.geneFamilyLink,
      }, {
        title: 'Gene Tour: Phylotree',
        //NB: currently, this must use path instead of click on the
        //link element due to the fact that these are being made into
        //external absolute links to legumeinfo.org probably due to
        //peanutbase
        path: '/chado_phylotree/'+FOCUS_GENE_FAMILY+'?hilite_node='+FOCUS_PROTEIN,
        content: 'Waiting for tree display...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
	  var promise = lisTours.waitForSelector(tour, SELECTOR.phylotree);
          // advance automatically to next step when done loading
          promise.then(function() {
            tour.next();
          });
          return promise;
        }
      }, {
        title: 'Gene Tour: Phylotree',
        placement: 'right',
        content : 'Here is our gene again, surrounded by orthologues from other species. ',
        element : SELECTOR.phylotree,
	onShow: function(tour) {
	  return lisTours.waitForSelector(tour, SELECTOR.phylotree)
	},
      }, {
        title: 'Gene Tour: Phylotree',
        placement: 'right',
        content : 'Notice that the two other instances of the gene family from mungbean are in a separate clade. This suggests that the gene was duplicated in an ancestral species and the two copies were retained in most of the species (possibly with subsequent duplications within some of the descendant species). This could be due to an important difference in function that evolved after the ancient duplication occurred.',
        element : SELECTOR.phylotree,
      }, {
        title: 'Gene Tour: Phylotree',
        placement: 'right',
        content : 'The nodes of the tree representing the genes (as well as the internal ancestral nodes) can be clicked for more options.',
        element : SELECTOR.phylotree,
        reflex: true,
        onNext: function() {
          $('#phylogram g.leaf:contains("'+FOCUS_PROTEIN+'")').d3Click();
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $("#phylonode_popup_dialog a[href*='lis_context_viewer']")[0];
            });
          return promise;
        }
      }, {
        title: 'Gene Tour: Gene Linkouts',
        content: 'We get a popup with a number of options relevant to the gene.',
        element: SELECTOR.popup,
        placement: 'bottom',
      }, {
        title: 'Gene Tour: Genomic Contexts',
        content: 'Let\'s follow the link for similar genomic contexts',
        element: SELECTOR.contextViewerLink,
        reflex: true,
        placement: 'right',
        onNext: function() {
          $(SELECTOR.contextViewerLink)[0].click();
        }
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'Please be patient, as we wait for the page to load...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $('g.gene:has(:contains("'+FOCUS_GENE+'")) > path');
            });
          // advance automatically to next step when done loading
          promise.then(function() {
            tour.next();
          });
          return promise;
        }
      },{
        title: 'Gene Tour: Genome Context Viewer',
        content: 'Our gene is front and center, highlighted among the neighboring genes from the same region on the chromosome. All genes are color coded according to the gene families to which they belong, and genomic segments with similar gene content are aligned to the track containing our search gene.',
        element: SELECTOR.contextFocusGene,
        placement: 'top',
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'Hover over the gene family to see all representatives highlighted in their syntenic contexts. Click the gene family for more information.',
        element: SELECTOR.contextLocus,
        placement: 'left',
        onNext: function() {
          $(SELECTOR.contextLocus).d3Click();
        },
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'All representatives of the family present in the current view are listed.',
        element: SELECTOR.contextFocus,
        placement: 'right'
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'Following this link will take us back to the phylotree, with all of the syntenic members of the family highlighted.',
        element: SELECTOR.contextFamilyLink,
        placement: 'right',
        onNext: function() {
          $(SELECTOR.contextFamilyLink)[0].click();
        },
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'We see that most of the members of the clade containing our gene were found by the syntenic context matching. The context viewer alignment parameters might be relaxed to try to include more of the clade and see how the gene content of the regions may have diverged more rapidly in these species.',
        element: SELECTOR.phylotree,
        placement: 'right'
      }, {
        title: 'Gene Tour: The End',
        content: 'Congratulations, you\'ve made it to the end of the Gene Tour. Please let us know if you have any suggestions on how to improve the tools used in this tour or the tour itself by using our Contact form. Now press End Tour.' ,
        element: SELECTOR.contact,
        reflex: true,
        placement: 'bottom'
     }
    ]
  });


  lisTours.register(tour);
  
}(window.__jquery));


