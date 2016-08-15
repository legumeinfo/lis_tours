(function(jQuery) {

  var $ = jQuery;
  var FOCUS_GENE_FAMILY = 'phytozome_10_2.59088092';
  var FOCUS_GENE = 'vigra.Vradi01g03360';
  var FOCUS_GENE_UNIQUENAME = 'Vradi01g03360.Vradi.ver6';
  var FOCUS_PROTEIN = FOCUS_GENE + '.1';
  var FOCUS_GENE_FUNCTION = 'gamma-glutamyl transpeptidase';
  // jquery selectors which are used in the tour definition 
  var SELECTOR = {
    context_link: '#phylonode_popup_dialog a[href*="lis_context_viewer"]',
  };

  var tour = new Tour({
    name: 'gene-to-phylotree-to-context-viewer',
    keyboard: true,
    debug: true,
    orphan: true,
    steps : [
      {
        title: 'Gene Tour: Welcome to LIS!',
        content: 'Let\'s go the legumeinfo.org homepage, where the Gene Tour will begin.  Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
        placement: 'bottom',
        element: '#site-name',
        reflex: true,
      }, {
        path: '/home',
        title: 'Gene Tour: Getting started',
        content: "This tour will provide an example of navigating LIS from a gene annotated with a specific function to views of its evolutionary context both with respect to other individual genes as well as to the genomic context in which it occurs.<br> Now press the Gene Search button, or use the Next button or press &#8594;.",
        placement: 'bottom',
        element: "a:contains('Gene Search')",
        reflex: true,
      }, {
        title: 'Gene Tour: Gene Search',
        path: '/search/gene',
        content: 'All the legume genes in LIS have been annotated with functional descriptors based on a consistent set of homology-based methods. We\'ll use gene function as a query to limit the set of genes in the results.',
        placement: 'top',
        element: 'th.views-field-description',
        reflex: 'true',
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'We can enter key terms from the expected description of the gene function in which we\'re interested here.',
        placement: 'bottom',
        element: '#edit-description',
        reflex: true,
        onShown: function(tour) {
          $('#edit-description')[0].value=FOCUS_GENE_FUNCTION;
        },
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'Then click "Apply" to apply the specified filter to the genes in the result.',
        placement: 'bottom',
        element: '#edit-submit-gene',
        reflex: true,
        onNext: function() {
          $('#edit-submit-gene')[0].click();
        }
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'Please be patient, as we wait for the query results to be returned...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          if(tour.skipStep) {
            tour.skipStep = false;
            tour.prev();
            return;
          }
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
        content: "We've gotten paged results back for genes matching the given description across all species with annotated genomes in LIS. ",
        element: 'th.views-field-name',
        placement: 'top',
        onPrev: function(tour) {
          tour.skipStep = true;
        }
      }, {
        title: 'Gene Tour: Filter by Species',
        content: "Supposing we are initially interested in the genes from Vigna radiata (mungbean), we would specify the five-letter species abbreviation 'vigra', composed of the first three letters of the genus and the first two letters of the species component of the scientific name.",
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
        title: 'Gene Tour: Gene Search',
        content: 'Again click "Apply" to apply the added filter to the genes in the result.',
        placement: 'bottom',
        element: '#edit-submit-gene',
        reflex: true,
        onNext: function() {
          $('#edit-submit-gene')[0].click();
        }
      }, {
        title: 'Gene Tour: Gene Search',
        content: 'Waiting for query results...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          if(tour.skipStep) {
            tour.skipStep = false;
            tour.prev();
            return;
          }
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $('tr.views-row-first td.views-field-abbreviation:contains(\'vigra\')')[0];
            });
          // advance automatically to next step when done loading
          promise.then(function() {
            tour.next();
          });
          return promise;
        }
       }, {
     title: 'Gene Tour: Functional description',
     content: "Notice that there is a subtle difference in the annotation of the genes, though they are all listed as belonging to the same gene family.",
     placement: 'top',
     element: "th.views-field-description",
     onPrev: function(tour) {
       tour.skipStep = true;
     },
      }, {
        title: 'Gene Tour: Gene Family',
        content: "Following the link to the gene family will show you this gene in the context of a tree representing the orthologous, paralogous and homoeologous members of the family.",
        placement: 'left',
        element: 'a[href*="'+FOCUS_GENE_UNIQUENAME+'"]:contains("'+FOCUS_GENE_FAMILY+'")',
      }, {
        title: 'Gene Tour: Phylotree',
        //NB: currently, this must use path instead of click on the link element due to the fact that these are being made into external absolute links to legumeinfo.org probably due to peanutbase
        path: '/chado_phylotree/'+FOCUS_GENE_FAMILY+'?hilite_node='+FOCUS_PROTEIN,
        content: 'Waiting for tree display...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          if(tour.skipStep) {
            tour.skipStep = false;
            tour.prev();
            return;
          }
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $('#phylogram g:has(text:contains("'+FOCUS_PROTEIN+'"))')[0];
            });
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
        element : 
          '#phylogram text:contains("'+FOCUS_PROTEIN+'")',
        onPrev: function(tour) {
          tour.skipStep = true;
        },
      }, {
        title: 'Gene Tour: Phylotree',
        placement: 'right',
        content : 'Notice that the two other instances of the gene family from mungbean are in a separate clade. This suggests that the gene was duplicated in an ancestral species and the two copies were retained in most of the species (possibly with subsequent duplications within some of the descendant species). This could be due to an important difference in function that evolved after the ancient duplication occurred.',
        element : 
          '#phylogram text:contains("vigra.Vradi02g12890.1")',
      }, {
        title: 'Gene Tour: Phylotree',
        placement: 'right',
        content : 'The nodes of the tree representing the genes (as well as the internal ancestral nodes) can be clicked for more options.',
        element : 
          '#phylogram text:contains("'+FOCUS_PROTEIN+'")',
        reflex: true,
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
          $('#phylogram g.leaf:contains("'+FOCUS_PROTEIN+'")').d3Click();
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $("#phylonode_popup_dialog a[href*='lis_context_viewer']")[0];
            });
          // advance automatically to next step when done loading
          promise.then(function() {
              //for reasons adf doesn't entirely understand, we don't need to
              //invoke the tour.next here and in fact doing so gives the double
              //click phenomenon where the popup appears and then gets re-invoked
              //adf now sees that all other calls to tour.next are from onShown functions, not onNext. makes more sense now. should remove when can test more carefully
              //tour.next();
          });
          return promise;
        }
      }, {
        title: 'Gene Tour: Gene Linkouts',
        content: 'We get a popup with a number of options relevant to the gene.',
        element: "#phylonode_popup_dialog",
        placement: 'bottom',
      }, {
        title: 'Gene Tour: Genomic Contexts',
        content: 'Let\'s follow the link for similar genomic contexts',
        element: "#phylonode_popup_dialog a[href*='lis_context_viewer']",
        reflex: true,
        placement: 'right',
        onNext: function() {
          $(SELECTOR.context_link)[0].click();
        }
      }, {
        //path: '/lis_context_viewer/index.html#/search/'+FOCUS_GENE+'?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome',
        //path: RegExp("\/lis_context_viewer\/index.html#\/search"),
        //path: /\/lis_context_viewer\/index.html#\/search/,
        title: 'Gene Tour: Gene Search',
        content: 'Please be patient, as we wait for the page to load...',
        placement: 'top',
        /*
        onShow: function(tour) {
          // if the URL is not matching lis_context_viewer
          if(document.location.href.indexOf('lis_context_viewer/') === -1) {
            console.log('redirecting to example context viewer: '+ LANDING_URL);
            document.location.href = LANDING_URL;
            return (new jQuery.Deferred()).promise();
          }
          */
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          if(tour.skipStep) {
            tour.skipStep = false;
            tour.prev();
            return;
          }
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
        //path : '/lis_context_viewer/index.html#/search/vigra.Vradi01g03360?numNeighbors=8&numMatchedFamilies=6&numNonFamily=5&algorithm=repeat&match=5&mismatch=-1&gap=-1&score=25&threshold=25&track_regexp=&order=chromosome',
        title: 'Gene Tour: Genome Context Viewer',
        content: 'Our gene is front and center, highlighted among the neighboring genes from the same region on the chromosome. All genes are color coded according to the gene families to which they belong, and genomic segments with similar gene content are aligned to the track containing our search gene.',
        element: 'g.gene:has(:contains("Vradi01g03360")) > path',
        placement: 'top',
        onPrev: function(tour) {
          tour.skipStep = true;}
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'Hover over the gene family to see all representatives highlighted in their syntenic contexts. Click the gene family for more information.',
        element: 'g.legend:has(:contains("phytozome_10_2.59088092"))',
        placement: 'left',
        onNext: function() {
          $.fn.d3Click = function () {
            this.each(function (i, e) {
              var evt = new MouseEvent('click');
              e.dispatchEvent(evt);
            });
          };
          $('g.legend:has(:contains("phytozome_10_2.59088092"))').d3Click();
        },
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'All representatives of the family present in the current view are listed.',
        element: 'h4:contains("phytozome_10_2.59088092")',
        placement: 'right'
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'Following this link will take us back to the phylotree, with all of the syntenic members of the family highlighted.',
        element: 'a:contains("View genes in phylogram")',
        placement: 'right',
        onNext: function() {
              $('a:contains("View genes in phylogram")')[0].click();
        },
      }, {
        title: 'Gene Tour: Gene Family Focus',
        content: 'We see that most of the members of the clade containing our gene were found by the syntenic context matching. The context viewer alignment parameters might be relaxed to try to include more of the clade and see how the gene content of the regions may have diverged more rapidly in these species.',
        element: '#phylogram text:contains("'+FOCUS_PROTEIN+'")',
        placement: 'right'
      }, {
        path : '/tours',
        title: 'Gene Tour: The End',
        content: 'Congratulations, you\'ve made it to the end of the Gene Tour. Please let us know if you have any suggestions on how to improve the tools or this tour by using our Contact form. And don\'t forget to click End Tour to avoid unexpected re-entry as you visit the rest of the site.' ,
        element: 'a:contains("Contact")',
        placement: 'bottom'
     }
    ]
  });


  lisTours.register(tour);
  
}(window.__jquery));


