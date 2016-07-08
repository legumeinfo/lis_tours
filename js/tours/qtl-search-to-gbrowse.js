(function(jQuery) {

  var $ = jQuery;
  var tour = new Tour({
    name: 'qtl-search-to-gbrowse',
    debug: true,
    orphan: true,
    steps : [ {
      path: '/tours',
      title: 'Welcome to LIS!',
      content: 'Clicking "next" will take you to our homepage, where the tour will begin.',
      placement: 'bottom',
      element: '#site-name',
    }, {
      path: '/',
      title: 'QTL Tour: Getting started',
      content: 'This tour will provide an example of navigating LIS from the genetic location of a published QTL to the associated region of the annotated genome for the species in which it was found. From the home page, the QTL search can be accessed from this button, but to continue on the tour click "Next".',
      placement: 'bottom',
      element: "[href='/search/qtl']",
    }, {
      path: '/search/qtl',
      title: 'QTL Tour: Finding the desired QTL',
      content: 'All of the QTLs that have been curated into LIS from the literature are displayed in the paged results below, and can be filtered using the search fields above.',    
      placement: 'bottom',
      element: '#edit-qtl-name',
      onShown: function() {
	$('#edit-qtl-name')[0].value='Seed yield';
      },
    }, {
      path: '/search/qtl?organism=Phaseolus%20vulgaris&trait_class=All&expt_pub_symbol_op=%3D&expt_pub_symbol=&qtl_name_op=%3D&qtl_name=seed%20yield',
      title: 'QTL Tour: The list of QTL matching the query',
      content: 'Let us look at the details for a specific "seed yield" QTL.',
      element: "[href='/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5']",
      placement: 'bottom',
    }, {
      path: '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5',
      title: 'QTL Tour: Information about the selected QTL',
      content: "To go straight for the details, the 'details' link can lead you right to this trait's place on the chromosome.",
      placement: 'right',
      element: "[href='?pane=qtl_details']",
      onNext: function() {
	$("[href='?pane=qtl_details']")[0].click();
      }
    }, {
      title: 'QTL Tour: BM199 = Nearest Marker',
      content: 'This is the marker that had the strongest association with variation in the trait for this QTL, among those used in the mapping experiment. Since the marker has sequence information associated with it, we can find its position in the genome sequence to find the general region in which the gene responsible for the QTL may be found- note, however that the marker is not guaranteed to be very close to any candidate gene, and you should use this only as a very general guide. Click Next to go to the Marker Overview.',
      placement: 'right',
      element: "#tripal_feature-table-base a:contains('BM199')", 
    }, {
      path: '/feature/Phaseolus/vulgaris/genetic_marker/BM199',
      title: 'QTL Tour: Marker Overview',
      content: 'The "Overview" links to articles and descriptions of the marker. To find this marker on the phaseolus map, we can look under "Marker Positions".',
      element: "[href='?pane=positions']",
      placement: 'bottom',
      onNext: function() {
	$("[href='?pane=positions']")[0].click();	
      }
    }, {
      title: 'QTL Tour: Genome Browser',
      content: 'The linked Gbrowse map will show you annotations on the genome',
      element: "[href='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red']",
      placement: 'top'
    }, {
      path: '/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red',
      title: 'QTL Tour: Gbrowse',
      content: 'Allows you to visualize syntenic relationships between legumes of your choice. The red bar is the lowest flanking marker for "seed yield".',
    },{
      title: 'QTL Tour: Our track',
      content: 'Also visible is the lowest flanking marker, BM199. All the tracks can be dragged to rearrange them.',
    }, {
      title: 'QTL Tour: Settings',
      content: 'You can choose which tracks to display through the navigation bar.',
    }
  ]
  });

  lisTours.register(tour);
  
}(window.__jquery));


