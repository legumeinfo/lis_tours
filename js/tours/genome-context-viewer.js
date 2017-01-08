'use strict';

(function(jQuery) {

  var $ = jQuery;

  var EXAMPLE_URL = "/lis_context_viewer/index.html#/search/lis/phavu.Phvul.002G085200?numNeighbors=10&numMatchedFamilies=4&numNonFamily=5&algorithm=repeat&match=10&mismatch=-1&gap=-1&score=30&threshold=25&track_regexp=&order=distance&sources=lis";
  var SELECTOR = {
    welcomeAnchor: 'button:contains("Legend")',
    macroSynteny: 'rect.viewport',
    familyLegendButton: 'button:contains("Legend")',
    legend: 'app-legend',
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
      content: 'To view the Context Viewer help and interactive tour, you will be redirected to an example Search view, instead of the Basic view. Please press the <strong>Next</strong> button to continue, or <strong>End Tour</strong> button to stay on the current Basic view.',
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
      title: 'Welcome',
      content: 'This quick tour will acquaint you with the genome context viewer application, which is useful for exploring microsynteny relationships among sets of genomic segments. Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
      element: SELECTOR.welcomeAnchor,
      placement: 'left',
    }, {
      title: "Context Viewer",
      content: "The context viewer displays corresponding regions around a selected gene or set of genes. It makes it easy to find functional gene groups as well as help make hypotheses about their evolutionary histories. Gene glyphs have mouse over and click interactivity. If a glyph is moused over its name and genomic position are shown. If a gene is clicked a widget will appear with a variety of links related to the gene, such as a link to the source of the gene annotation. The thicker the connecting line between the genes, the longer the intergenic distance on the chromosome; intergenic distances and gene identities for tracks can also be displayed by mousing over the track labels to the left of the tracks.",
      element: "path.point.focus:first",
      placement: "top",
    }, {
      title: "Macrosynteny Blocks",
      content: "Chromosomes or scaffolds identified as having microsynteny to the query segment will be used to search for large-scale macrosynteny to the query. The vertical bar shows you the position and extent of the query segment in its chromosomal context, and the colored blocks show how far synteny extends beyond the current microsynteny viewe. Having these blocks available depends on pre-computed server-side analyses, and may not always be in perfect agreement with the results of the microsynteny blocks- especially when macrosynteny has not been pre-computed between given pairs of genomes. The microsynteny search depends only upon pre-assignment of genes to families, the rest is done dynamically when the request is made. ",
      element: SELECTOR.macroSynteny,
      placement: "right",
    }, {
      title: "Legend",
      content: "Clicking the Legend button will reveal the identity of the gene families represented by the colors.",
      element: SELECTOR.familyLegendButton,
      placement: "left",
      onNext: function(tour) {
        $(SELECTOR.familyLegendButton).click();
      },
    }, {
      title: "Gene Families: Legend",
      content: "Each gene in a Context View is colored by the gene family it belongs to as indicated in the legend (genes belonging to families with no other representatives in a view are left uncolored, while genes not belonging to families are uncolored and have dotted outlines). In the case where a single gene is used to invoke the viewer, that gene's context track will be used as a query to find other tracks annotated with similar gene family content in the database. If a set of genes from a gene family was used to request a view, these genes will be centered in each context but no alignment of the tracks will be performed.",
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
      title: "Gene Families",
      content: "Since genes in a family tend to have relatively similar sequences, we can use them to predict the functions of newly identified genes based on their relations to other known genes, especially in cases where the genes are found in similar syntenic contexts. Gene family colors in the legend will display all representatives of the family in the current view when moused-over, or when clicked will list those genes with the option to view them in the context of the family's phylogenetic tree. ",
      element: SELECTOR.legend,
      placement: "left"
    }, {
      title: "Dot Plots",
      content: "Dot plots are useful in identifying interspersed, lost, or gained repeat motifs. The <strong>plot</strong> link reveals the dot plot for the given genome track against the query track. (If you cannot see the <strong>plot</strong> plot links, maximize your browser window)",
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
      title: "The Plot Thickens",
      content: "The main diagonal shows the sequence's alignment with itself, while patterns off the main diagonal indicate structural similarities among different parts of the sequences. Lines off the main diagonal imply different regions with a high similarity.", 
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
      title: "Global Plots",
      content: "Just like the local plot but instead of focusing only on the matched syntenic segment, the global plot displays all instances of genes from the families of the query track in across the chromosome from which the matched syntenic segment was taken. This gives a better sense for the frequency with which members of these families occur outside the matched context and can reveal wider syntenic properties.",
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
      content: "The 'Neighbors' value controls the number of genes that surround the central gene. By default, the regions extend out by 8 genes upstream and down from the selected genes. Increasing this value will give you longer contexts with more sensitivity for finding distant matches, but will increase retrieval times and may make the display harder to interpret.",
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
      content: "Clicking the Help icon will reveal descriptions of the parameters",
      element: SELECTOR.queryParameters, //Should point to the field input, but depends on the size/shape of the window.
      placement: "right",       
      onShow: function() {
        $(SELECTOR.queryParameters)[0].click();
      },
      onNext: function() {
        $(SELECTOR.alignParameters)[0].click();
      }
    }, {
      title: "Alignment Parameters",
      content: "Synteny between tracks is determined via a modified Smith-Waterman or Repeat alignment algorithm. For Smith-Waterman, the orientation (forward/reverse) with the higher score is displayed. For the Repeat algorithm, all alignments are kept and displayed as related tracks. This has the advantage of nicely capturing inversions.",
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
      title: "Alerts",
      content: "A context search is performed by querying a database for tracks with similar gene family content to a query track. The result tracks found are then aligned to the query track using alignment based on common family memberships. The search view displays the query track and the alignments that meet the specified alignment criteria. If the number of tracks returned exceeds the number aligned, you may consider altering the Alignment Parameters to see if you are missing out on some more complex syntenic relationships.",
      element: SELECTOR.alerts,
      placement: "bottom",
      arrowOffset: "center"
    }, {
      title: 'Context Viewer Tour: Completed',
      content: 'Congratulations, you have finished the Context Viewer Tour! Now press End Tour.',
    }
  ]
  });

  lisTours.register(tour);

}(window.__jquery));

