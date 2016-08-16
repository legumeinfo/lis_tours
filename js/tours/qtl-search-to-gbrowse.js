(function(jQuery) {

  var $ = jQuery;
  var GBROWSE = '/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red';
  var FOCUS_TRAIT_TERM = 'Seed yield';
  var FOCUS_TRAIT = 'phavu.Seed-yield-2-6';
  var SELECTOR = {
    welcome: '#site-name',
    searchBtn: "[href='/search/qtl']",
    viewContent: '.view-content',
    editQtlName: '#edit-qtl-name',
    editQtlSubmit: '#edit-submit-qtl',
    searchResult: '[href="/feature/Phaseolus/vulgaris/QTL/'+FOCUS_TRAIT+'"]',
    detailsPane: "[href='?pane=qtl_details']",
    positionsPane: "[href='?pane=positions']",
    nearestMarker: "#tripal_feature-table-base > tbody > tr:nth-child(2) > td > a",
    gbrowseLink: "[href='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red']",
    gbrowseFrame: '#frameviewer',    
  };
  var tour = new Tour({
    name: 'qtl-search-to-gbrowse',
    debug: true,
    orphan: true,
    steps : [
      {
          title: 'QTL Tour: Welcome to LIS!',
          content: 'Let\'s go the legumeinfo.org homepage, where the QTL Tour will begin.<br>Use the Next button or &#8594; (right arrow key) to advance the tour. Use the Prev button or &#8592; (left arrow key) to step back.',
          placement: 'bottom',
          element: SELECTOR.welcome,
          reflex: true,    
      }, {
          path: '/',
          title: 'QTL Tour: Getting started',
          content: 'This tour will provide an example of navigating LIS from the genetic location of a published QTL to the associated region of the annotated genome for the species in which it was found.<br> Now press the QTL Search button, or use the Next button or press &#8594;.',
          placement: 'bottom',
          element: SELECTOR.searchBtn,
          reflex: true,
      }, {
          path: '/search/qtl',
          title: 'QTL Tour: QTL Search',
          content: 'All of the QTLs that have been curated into LIS from the literature are displayed in the paged results below, and can be filtered using the search fields above.',
          placement: 'top',
          element: SELECTOR.viewContent,
          reflex: true,
      }, {
          title: 'QTL Tour: QTL Search',
          content: 'We entered "'+FOCUS_TRAIT_TERM+'" in the QTL name field. This reflects the standardized trait ontology used by the curators. Now press Next or &#8594;',
          placement: 'bottom',
          element: SELECTOR.editQtlName,
          reflex: true,
          onShown: function(tour) {
            $(SELECTOR.editQtlName)[0].value=FOCUS_TRAIT_TERM;
          },
      }, {
          title: 'QTL Tour: QTL Search',
          content: 'Then click "Apply" to apply the specified filter to the QTL in the result.',
          placement: 'bottom',
          element: SELECTOR.editQtlSubmit,
          reflex: true,
          onNext: function() {
            $(SELECTOR.editQtlSubmit)[0].click();
          }
      }, {
        title: 'QTL Tour: QTL Search',
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
              return $('tr.views-row-first td.views-field-qtl-name:contains("'+FOCUS_TRAIT_TERM+'")')[0];
            });
          // advance automatically to next step when done loading
          promise.then(function() {
            tour.next();
          });
          return promise;
        }
      }, {
          path: '/search/qtl',
          title: 'QTL Tour: The list of QTL matching the query',
          content: 'Let\'s look at the details for a specific QTL.',
          element: SELECTOR.searchResult,
          reflex: true,
          placement: 'bottom',
          onPrev: function(tour) {
            tour.skipStep = true;
          }
      },
      {
          path: '/feature/Phaseolus/vulgaris/QTL/'+FOCUS_TRAIT,
          title: 'QTL Tour: Information about the selected QTL',
          content: "The QTL Details link will reveal this QTL's place on the chromosome.",
          placement: 'right',
          element: SELECTOR.detailsPane,
          reflex: true,
          onNext: function(tour) {      
            var el = $(SELECTOR.detailsPane)[0];
            if(el) {
              el.click();
            }
          }
      }, {
        path: '/feature/Phaseolus/vulgaris/QTL/'+FOCUS_TRAIT+'#pane=qtl_details',
        title: 'QTL Tour: Nearest Marker',
        content: 'This is the marker that had the strongest association with variation in the trait for this QTL, among those used in the mapping experiment. Since the marker has sequence information associated with it, we can find its position in the genome sequence to find the general region in which the gene responsible for the QTL may be found- note, however that the marker is not guaranteed to be very close to any candidate gene, and you should use this only as a very general guide.',
        placement: 'right',
        element: SELECTOR.nearestMarker,
        reflex: true,
        onShow: function(tour) {
          if(location.hash.indexOf('qtl_details') === -1) {
            var el = $(SELECTOR.detailsPane)[0];
            if(el) {
              el.click();
            }
          }
        }
      }, {
        path: '/node/1360783', /* url must match prev reflex element url */
        title: 'QTL Tour: Marker Overview',
        content: 'The "Overview" links to articles and descriptions of the marker. To find this marker on the phaseolus map, we can look under "Marker Positions".',
        element: SELECTOR.positionsPane,
        reflex: true,
        placement: 'bottom',
        onNext: function(tour) {
          var el = $(SELECTOR.positionsPane)[0];
          if(el) {
            el.click();
          }
        }
      }, {
        path: '/node/1360783#pane=positions',
        title: 'QTL Tour: Genome Browser',
        content: 'The linked GBrowse map will show you annotations on the genome.',
        element: SELECTOR.gbrowseLink,
        reflex: true,
        placement: 'top',
        onShow: function(tour) {
          if(location.hash.indexOf('positions') === -1) {
            var el = $(SELECTOR.positionsPane)[0];
            if(el) {
              el.click();
            }
          }
        }
      }, {
        path: GBROWSE,
        title: 'QTL Tour: GBrowse',
        content: 'Loading GBrowse...',
        placement: 'top',
        onShown: function(tour) {
          // wait for dynamic content with a loading dialog.
              $('.popover-navigation div').hide();
          if(tour.skipStep) {
            tour.skipStep = false;
            tour.prev();
            return;
          }
          var promise = lisTours.waitForContent(
            tour,
            function() {
              return $(SELECTOR.gbrowseFrame).contents().find('#centromere_image')[0];
            });
          // advance automatically to next step when done loading
          promise.then(function() {
            tour.next();
          });
          return promise;
        }
      }, {
        title: 'QTL Tour: GBrowse',
        content: 'GBrowse allows you to visualize features of biological significance that have been located on reference genomes, for example annotated genes or syntenic relationships to other legume genomes. The red bar shows us the position of the marker associated with our search QTL.',
        element: SELECTOR.gbrowseFrame,
        placement: 'top',
        onPrev: function(tour) {
          tour.skipStep = true;
        },
        onNext: function() {
          $(SELECTOR.gbrowseFrame).contents().find('select.searchtitle').val(5000000).change();
        }
      }, {
        title: 'QTL Tour: GBrowse Navigation',
        content: 'Zooming out will give you better sense for the genomic neighborhood in which the marker resides. We\'re right at the edge of some conserved syntenic blocks. We also see that the loss of synteny corresponds to our entrance into a region relatively poor in annotated gene content on the edge of the centromere.',
        element: SELECTOR.gbrowseFrame,
        placement: 'top',
      }, {
        title: 'QTL Tour: GBrowse Settings',
        content: 'You can rearrange tracks by dragging them, or choose which tracks to display through the navigation bar (Select Tracks).',
        element: SELECTOR.gbrowseFrame,
        placement: 'top'
      }, {
        title: 'QTL Tour: Completed',
        content: 'Congratulations, you have finished the QTL Tour! Summary: We navigated LIS from the genetic location of a published QTL to the associated region of the annotated genome for Phaseolus Vulgaris. Please let us know if you have any suggestions on how to improve the tools used in this tour or the tour itself by using our Contact form. Now press End Tour.',
        element: 'a:contains("Contact")',
        reflex: true,
        placement: 'bottom'
      }
    ]
  });

  lisTours.register(tour);
  
}(window.__jquery));
