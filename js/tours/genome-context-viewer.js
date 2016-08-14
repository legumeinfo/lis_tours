(function(jQuery) {

  var $ = jQuery;

  // jquery selectors which are used in the tour definition 
  var SELECTOR = {
    home_button: 'a:contains("Context Viewer")',
  };

  var EXAMPLE_URL = "/lis_context_viewer/index.html#/search/lis/phavu.Phvul.002G085200?numNeighbors=10&numMatchedFamilies=4&numNonFamily=5&algorithm=repeat&match=10&mismatch=-1&gap=-1&score=30&threshold=25&track_regexp=&order=distance&sources=lis";
  var LANDING_URL = "/lis_context_viewer/#/instructions";
  
  var tour = new Tour({

    name: 'genome-context-viewer',
    debug: true,
    orphan: true,

    steps: [
        {
          title: "Genome Context Viewer Tour: Welcome to LIS!",
          content: 'Let\'s go the legumeinfo.org homepage, where the Genome Context Viewer Tour will begin.  Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
          element: "#site-name",
          placement: "bottom",
          reflex: "true",
        },
        {
          title: "Genome Context Viewer Tour: Getting started",
          path: "/home",
          content: 'The Genome Context Viewer can be linked to directly using gene names, and is linked to from many places on the site where genes are present. For this tour, we\'ll go directly via the front page.',
          element: SELECTOR.home_button,
          placement: "bottom",
          reflex: "true",
          onNext: function() {
            $(SELECTOR.home_button)[0].click();
          }
        },
        {
          title: "Genome Context Viewer Tour: Landing Page",
      // Dont use complex path properties, because if the URL
      // path/hash/query string etc.  is changed by angular then
      // bootstrap-tour will go into a redirect loop trying to
      // load the stated path. This onShow() approach can be used
      // instead.
      
          //path: "/lis_context_viewer/#/instructions",
          //path: "/lis_context_viewer/index.html#/search/lis/phavu.Phvul.002G085200?numNeighbors=10&numMatchedFamilies=4&numNonFamily=5&algorithm=repeat&match=10&mismatch=-1&gap=-1&score=30&threshold=25&track_regexp=&order=distance&sources=lis",
      onShow: function(tour) {
        // if the URL is not matching lis_context_viewer
        if(document.location.href.indexOf('lis_context_viewer/') === -1) {
          console.log('redirecting to example context viewer: '+ LANDING_URL);
          document.location.href = LANDING_URL;
          return (new jQuery.Deferred()).promise();
        }
      },
          content: "The Genome Context Viewer allows you to view regions of genomes considered primarily with respect to the ordering and orientation of their annotated gene content, as well as to search for segments similar in gene content and organization. This allows a quick but powerful view into microsyntenic relationships among difference chromosomal segments.",
          element: 'h1:contains("Welcome")',
        },
        {
          title: "Genome Context Viewer Tour: Examples",
          content: "We've provided some examples to get you started. For this tour, we'll focus on the first example.",
          element: 'h2:contains("Examples") + li',
          placement: "right",
        },
        {
          title: "Gene Families: Legend",
          content: "Each gene in a Context View is colored by the gene family it belongs to as indicated in the legend (genes belonging to families with no other representatives in a view are left uncolored, while genes not belonging to families are uncolored and have dotted outlines). In the case where a single gene is used to invoke the viewer, that gene's context track will be used as a query to find other tracks annotated with similar gene family content in the database. If a set of genes from a gene family was used to request a view, these genes will be centered in each context but no alignment of the tracks will be performed.",
          element: "#legend",
          placement: "left",
      onShow: function(tour) {
        // if the URL is not matching lis_context_viewer
        if (document.location.href.indexOf(EXAMPLE_URL) === -1) {
          console.log('redirecting to example context viewer: '+ EXAMPLE_URL);
          document.location.href = EXAMPLE_URL;
          return (new jQuery.Deferred()).promise();
        }
      }
         }, 
        {
          title: "Gene Families",
          content: "Since genes in a family tend to have relatively similar sequences, we can use them to predict the functions of newly identified genes based on their relations to other known genes, especially in cases where the genes are found in similar syntenic contexts. Gene family colors in the legend will display all representatives of the family in the current view when moused-over, or when clicked will list those genes with the option to view them in the context of the family's phylogenetic tree. ",
          element: "#legend-content",
          placement: "left"
           },    
        {
          title: "Context Viewer",
          content: "The context viewer displays corresponding regions around a selected gene or set of genes in a subtree. It makes it easy to find functional gene groups as well as help make hypotheses about their evolutionary histories. Gene glyphs have mouse over and click interactivity. If a glyph is moused over its name and genomic position are shown. If a gene is clicked a widget will appear with a variety of links related to the gene, such as a link to the source of the gene annotation. The thicker the connecting line between the genes, the longer the intergenic distance on the chromosome; intergenic distances and gene identities for tracks can also be displayed by mousing over the track labels to the left of the tracks.",
          element: ".rail:last",
          placement: "bottom",
         },      
        {
          title: "Dot Plots",
                content: "Dot plots are useful in identifying interspersed, lost, or gained repeat motifs.",
          element: ".axis_right",
          placement: "top",
          multipage: true,
          onNext: function() {
              $.fn.d3Click = function () {
                this.each(function (i, e) {
                  var evt = new MouseEvent('click');
                  e.dispatchEvent(evt);
                });
              };
              $('.axis_right text:first').d3Click();    
              var promise = lisTours.waitForContent(
                tour,
                function() {
                  return $("#plot")[0];
                });
              return promise;
           }
        },    
        {
         title: "The Plot Thickens",
         content: "The main diagonal shows the sequence's alignment with itself, while patterns off the main diagonal indicate structural similarities among different parts of the sequences. Lines off the main diagonal imply different regions with a high similarity.", 
         element: "local-plot",
         placement: "left",
         onNext: function() {
             $('#gloplot')[0].click();
              $.fn.d3Click = function () {
                this.each(function (i, e) {
                  var evt = new MouseEvent('click');
                  e.dispatchEvent(evt);
                });
              };
             $('.axis_right text:first').d3Click();

              var promise = lisTours.waitForContent(
                tour,
                function() {
                  return $("#global-plot")[0];
                });
              return promise;
           }
        },         
        {   
         title: "Global Plots",
         content: "Just like the local plot but instead of focusing only on the matched syntenic segment, the global plot displays all instances of genes from the families of the query track in across the chromosome from which the matched syntenic segment was taken. This gives a better sense for the frequency with which members of these families occur outside the matched context and can reveal wider syntenic properties.",
         element: "#global-plot",
         placement: "left"
        },         
        {  
         title: "Parameters",
         content: "These parameters allow you to fine-tune the candidate tracks retrieved and the alignments produced from them.",
         element: "#parambtn",    
         placement: "bottom",
         onNext: function() {
            $('#parambtn')[0].click();
            if (! $('#left-slider').is(':visible')) {
            }
         }
        },
        {
         title: "Neighbors",
         content: "The 'Neighbor' value controls the number of genes that surround the central gene. By default, the regions extend out by 8 genes upstream and down from the selected genes. Increasing this value will give you longer contexts with more sensitivity for finding distant matches, but will increase retrieval times and may make the display harder to interpret.",
         element: "#neighborpane", //Should point to the field input, but depends on the size/shape of the window.
         placement: "right",       
        },
        {
         title: "Scroll Control",
         content: "The scroll input is used to scroll in either direction on the query track's chromosome. In other words, given a scroll distance and direction from the current focus gene, a new query is made with the track built around the new focus found with these parameters. The allowed scroll values are constrained so that the new focus gene after scrolling is present in the context before scrolling.",
         element: "#form-wrapper",
         placement: "right"
            },    
        {
         title: "Algorithms",
         content: "Synteny between tracks is determined via a modified Smith-Waterman or Repeat alignment algorithm. For Smith-Waterman, the orientation (forward/reverse) with the higher score is displayed. For the Repeat algorithm, all alignments are kept and displayed as related tracks. This has the advantage of nicely capturing inversions.",
         element: "#algpar",
         placement: "right",
        },
        {
         title: "Alerts",
         content: "A context search is performed by querying a database for tracks with similar gene family content to a query track. The result tracks found are then aligned to the query track using alignment based on common family memberships. The search view displays the query track and the alignments that meet the specified alignment criteria. If the number of tracks returned exceeds the number aligned, you may consider altering the Alignment Parameters to see if you are missing out on some more complex syntenic relationships.",
         element: "#alerts",
         placement: "bottom",
         arrowOffset: "center"
        },
        {
         title: "Want to know more?",
         content: "This\
         documentation <a href='http://legumeinfo.org' \
            target='_blank'>link</a> will take you back to the LIS homepage.",
         element: "#helpbtn",
         placement: "bottom"
         }
    ],
  });

  lisTours.register(tour);

}(window.__jquery));

