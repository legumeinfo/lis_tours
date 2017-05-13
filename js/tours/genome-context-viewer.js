'use strict';

(function(jQuery) {

  var $ = jQuery;

  var EXAMPLE_URL = "/lis_context_viewer/index.html#/search/lis/phavu.Phvul.002G085200?neighbors=15&algorithm=repeat&match=10&mismatch=-1&gap=-1&score=100&threshold=20&order=distance&sources=lis&regexp=&matched=5&intermediate=5";
  var SELECTOR = {
    welcomeAnchor: 'button:contains("Legend")',
    macroSynteny: 'rect.viewport',
    split: 'div.gutter:first',
    familyLegendButton: 'button:contains("Legend")',
    legend: '#bottom-right',
    dotplotLink: 'text:contains("plot"):gt(3):first',
    dotplot: 'plot',
    globalDotplotLink: 'a:contains("Global")',
    paramsButton: 'button:contains("Parameters")',
    searchParams: 'div.left-slider-content',
    queryParameters: '#query-params-help',
    alignParameters: '#align-params-help',
    filterButton: 'button:contains("Filter")',
    trackOrdering: '#order-form',
    trackScrolling: '#scroll-form',
    alerts: 'div.alerts',
    multiDotPlot: 'a:contains("Dot Plots")',
  };

  function inContextViewer() {
    return document.location.href.indexOf('lis_context_viewer') !== -1;
  }
  function inBasicMode() {
    return document.location.hash.indexOf('/basic') !== -1;
  }
  function inSearchMode() {
    return document.location.hash.indexOf('/search') !== -1;
  }
  
  var tour = new Tour({

    name: 'genome-context-viewer',
    debug: true,
    orphan: true,
    template: lisTours.template.noPrevBtnTemplate,
    steps: [{
      /* First, check if the user is in the context viewer in the
      basic view, and if so, prompt them to be redirected to the
      search view. Dont want to abruptly yank them out from one view
      to another. */
      title: 'Please note',
      content: 'To view the Genome Context Viewer help and interactive tour, you will be redirected to an example Search view, instead of the Basic view. Please press the <strong>Next</strong> button to continue, or <strong>End Tour</strong> button to stay on the current Basic view.',
      onShown: function(tour) {
        if(! inContextViewer()) {
          tour.next();
        }
        else if(inSearchMode()) {
          tour.next();
        }
        // else let the 1st step display to warn user.
      },
    }, {
      /* Second, confirm that we are currently in the context viewer,
	 and if not, redirect browser to example url. */
      title: 'Loading',
      content: 'Please wait...',
      onShown: function(tour) {
        if(inBasicMode() || ! inContextViewer()) {
          if(tour._options.debug) {
            console.log('redirecting to example focus gene : '+ EXAMPLE_URL);
          }
          tour.next();
          document.location.href = EXAMPLE_URL;
          return (new jQuery.Deferred()).promise();
        }
        else {
          tour.next();
        }
      }
    }, {
      // now start the actual tour!
      title: 'Welcome: Genome Context Viewer',
      content: 'This quick tour will acquaint you with the Genome Context Viewer application, which is useful for exploring synteny relationships among sets of genomic segments. Use the Next button or &#8594; (right arrow key) to advance the tour.',
      element: SELECTOR.welcomeAnchor,
      placement: 'left',
    }, {
      title: "Microsynteny Tracks",
      content: "The context viewer displays corresponding regions around a selected gene or set of genes. It makes it easy to find syntenic gene groups and helps suggest hypotheses about their evolutionary histories. When a single focus gene (highlighted) is used to invoke the viewer, that gene's context track will be used as a query to find other tracks annotated with similar gene family content in the database. When any gene glyph is clicked, a panel will appear with a variety of options, some internal to the tool and others determined by site-configurable linking services that can direct to other resources as appropriate for each species.",
      element: "path.point.focus:first",
      placement: "top",
    }, {
      title: "Microsynteny Tracks",
      content: "Although the primary representation in a track is of gene order and orientation, intergenic distances are suggested by the differential widths of the bars connecting adjacent genes. Track labels can also be moused-over or clicked for information and options regarding the complete track content.",
      element: "micro-viewer text.query",
      placement: "top",
    }, {
      title: "Macrosynteny Blocks",
      content: "Chromosomes or scaffolds identified as having microsyntenic matches to the query segment will be used to search for large-scale macrosynteny to the query. The vertical bar shows the position and extent of the query segment in its chromosomal context, and the colored horizontal blocks show how far synteny extends beyond the current microsynteny view. Having these blocks available depends on pre-computed server-side analyses, and may not always be in perfect agreement with the results displayed in the microsynteny tracks, especially when macrosynteny has not been pre-computed between given pairs of genomes. The microsynteny search depends only upon pre-assignment of genes to families, all the rest being done dynamically when the request is made.",
      element: SELECTOR.macroSynteny,
      placement: "right",
    }, {
      title: "View divider",
      content: "This divider can be moved up or down to change the proportion of space in the view dedicated to the macro- and micro-syntenic representations; similar dividers are available for the other main components of the view.",
      element: SELECTOR.split,
      placement: "top",
    }, {
      title: "Gene Families Legend",
      content: "The color of each gene in a Genome Context View is determined by the gene family to which it belongs, as indicated in the legend. Colors are assigned dynamically, but memorized in browser storage for consistency during browsing. Genes belonging to families with no other representatives in a view are left uncolored, while genes not belonging to families are both uncolored and have dotted outlines. Since genes in a family tend to have relatively similar sequences, we can use them to predict the functions of newly identified genes based on their relations to other known genes, especially in cases where the genes are found in similar syntenic contexts. Mouse-over of gene families in the legend will highlight all representatives of the family in the current view, while clicking on the families will display a panel listing those same genes with the option to view them in the context of the family's phylogenetic tree.",
      element: SELECTOR.legend,
      placement: "left",
      onShow: function() {
        $(SELECTOR.legend).animate({
          scrollTop: 400
        }, 3000);
        $(SELECTOR.legend).animate({
          scrollTop: 100
        }, 3000);
      }
    }, {
      title: "Dot Plots",
      content: "Dot Plots are useful in visualizing correspondences between pairs of tracks without relying upon alignment. The <strong>plot</strong> link reveals the dot plot for the given result genome track against the query track. (If you cannot see the <strong>plot</strong> links, maximize your browser window)",
      element: SELECTOR.dotplotLink,
      placement: "top",
      multipage: true,
      reflex: true,
      onNext: function() {
        $.fn.d3Click = function () {
          this.each(function (i, e) {
            var evt = new MouseEvent('click');
            e.dispatchEvent(evt);
          });
        };
        $(SELECTOR.dotplotLink).d3Click();    
        return lisTours.waitForContent(
          tour,
          function() {
            return $("plot")[0];
          });
      }
    }, {
      title: "Local Plot",
      content: 'All the genes from the result track are displayed as points, with the x-coordinate determined by the physical position of the gene in the result chromosome and the y-coordinate(s) determined by the physical positions of genes belonging to the same family in the query chromosome. Genes in the result track without a corresponding gene in the query are displayed along the "Outliers" axis above the plot.', 
      element: SELECTOR.dotplot,
      placement: "left",
      onNext: function() {
        $(SELECTOR.globalDotplotLink)[0].click();
        /*
        $.fn.d3Click = function () {
          this.each(function (i, e) {
            var evt = new MouseEvent('click');
            e.dispatchEvent(evt);
          });
        };
        $('.axis_right text:first').d3Click();
        return lisTours.waitForContent(
          tour,
          function() {
            return $(SELECTOR.dotplot)[0];
          });
          */
      }
    }, {   
      title: "Global Plot",
      content: "Instead of focusing only on the extent of the matched syntenic segment, the global plot displays all instances of genes from the families of the query track across the chromosome from which the matched segment was taken. This gives a better sense for the frequency with which members of these families occur outside the matched context and can reveal wider structural relationships, especially in cases where the chosen search and alignment strategy fails to produce a single track collecting all collinear segments between the result chromosome and the query segment.",
      element: SELECTOR.dotplot,
      placement: "left"
    }, {  
      title: "Parameters",
      content: "These parameters allow you to fine-tune the candidate tracks retrieved and the alignments produced from them.",
      element: SELECTOR.paramsButton,    
      placement: "bottom",
      onNext: function() {
        $(SELECTOR.paramsButton)[0].click();
        if (! $('#left-slider').is(':visible')) {
        }
      }
    }, {
      title: "Query Parameters",
      content: 'Options grouped under "Query Parameters" determine which remote track retrieval services will be invoked and how they should decide whether a segment of a chromosome has sufficiently similar gene family content to the query segment to be considered as a candidate for alignment by the client.',
      element: SELECTOR.queryParameters, //Should point to the field input, but depends on the size/shape of the window.
      placement: "right",       
      onShow: function() {
        $(SELECTOR.searchParams).animate({
          //not sure why the offset this gives is not what we want
          //scrollTop: $("#neighborpane").offset().top
          scrollTop: 0
        }, 1);
      }
    }, {
      title: "Query Parameters",
      content: "Clicking the Help icon will reveal further information regarding how each of these parameters may be used to control the results obtained from the genome data services.",
      element: SELECTOR.queryParameters, //Should point to the field input, but depends on the size/shape of the window.
      placement: "right",       
      onShow: function() {
        if ($(SELECTOR.queryParameters)[0]) {
          $(SELECTOR.queryParameters)[0].click();
        }
      },
      onNext: function() {
        if ($(SELECTOR.alignParameters)[0]) {
            $(SELECTOR.alignParameters)[0].click();
        }
      }
    }, {
      title: "Alignment Parameters",
      content: "Correspondence between the elements of the tracks is determined via sequence alignment algorithms, modified to consider the gene family assignments as the characters of a genomic alphabet. For Smith-Waterman, the orientation (forward/reverse) with the higher score is displayed (assuming it meets scoring criteria). For the Repeat algorithm, all alignments meeting threshold criteria are kept and displayed as related tracks. This has the advantage of nicely capturing inversions.",
      element: SELECTOR.alignParameters,
      placement: "right",
      onShow: function() {
        $(SELECTOR.searchParams).animate({
          //not sure why the offset this gives is not what we want
          //scrollTop: $("#algpar").offset().top
          scrollTop: 600
        }, 1);
      },
      onNext: function() {
        $(SELECTOR.paramsButton).click();
      }
    }, {
      title: "Alerts",
      content: "Application informational messages and warnings are displayed in the Alerts box. For example, if it indicates that the number of tracks returned by the search services exceeds the number meeting alignment thresholds, you may wish to consider altering the Alignment Parameters to capture more divergent or complex syntenic relationships.",
      element: SELECTOR.alerts,
      placement: "bottom",
      arrowOffset: "center"
    }, {
      title: "Track Filtering",
      content: "The filter allows you to specify name-matching patterns to restrict the set of aligned tracks that are displayed (regular expression syntax is supported). This will not apply to the query track.",
      element: SELECTOR.filterButton,
      placement: "top",
    }, {
      title: "Track Sorting",
      content: "The order of track display can be controlled here. Again, the query track will remain fixed at the top, regardless of order selection.",
      element: SELECTOR.trackOrdering,
      placement: "top",
    }, {
      title: "Track Scrolling",
      content: "Scrolling to the left or right can be effected by specifying the number of neighboring genes to move. An effect similar to zooming out can be had by increasing the number of neighboring genes in the query segment (via the Query Parameters).",
      element: SELECTOR.trackScrolling,
      placement: "top",
    }, {
      title: "Dot Plots",
      content: "A display of multiple pairwise local dot plots for the query track against itself and all result tracks meeting current filtering criteria is also available.",
      onShown: function() {
        $(SELECTOR.multiDotPlot)[0].click();
      },
      element: SELECTOR.multiDotPlot,
      placement: "right",
    }, {
      title: 'Genome Context Viewer Tour: Completed',
      content: 'Congratulations, you have finished the Genome Context Viewer Tour! Now press End Tour.',
    }
  ]
  });

  lisTours.register(tour);

}(window.__jquery));

