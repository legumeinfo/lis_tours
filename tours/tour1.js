var tour = {
  'id': 'tour1',
  'steps' : [ {
    title: 'Welcome to LIS!',
    content: 'Clicking "next" will take you to our homepage, where the tour will begin.',
    placement: 'bottom',
    target: 'site-name',
    multipage: true,
    onNext: function() {
      lisTours.location('/');
    }
  }, {
    title: 'QTL Tour: Getting started',
    content: 'This tour will provide an example of navigating LIS from the genetic location of a published QTL to the associated region of the annotated genome for the species in which it was found. From the home page, the QTL search can be accessed from this button, but to continue on the tour click "Next".',
    placement: 'bottom',
    target: function() {
      return jQuery("[href='/search/qtl']")[0];
    },
    multipage: true,
    onNext : function() {
      lisTours.location('/search/qtl');
    },
  }, {
    title: 'QTL Tour: Finding the desired QTL',
    content: 'All of the QTLs that have been curated into LIS from the literature are displayed in the paged results below, and can be filtered using the search fields above.',
    placement: 'bottom',
    target: 'edit-qtl-name',
    multipage: true,  
    onShow: function() {
	jQuery('#edit-qtl-name')[0].value='Seed yield';
    },
    onNext: function() {
      lisTours.location('/search/qtl?organism=Phaseolus%20vulgaris&trait_class=All&expt_pub_symbol_op=%3D&expt_pub_symbol=&qtl_name_op=%3D&qtl_name=seed%20yield');
    }
  }, {
    title: 'QTL Tour: The list of QTL matching the query',
    content: 'Let\'s look at the details for a specific "seed yield" QTL.',
    target: function() {
      return jQuery("[href='/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5']")[0]; 
    },
    placement: 'bottom',
    multipage: true,
    onNext : function() {
      lisTours.location('/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5');
    }
  }, {
    title: 'QTL Tour: Information about the selected QTL',
    content: "To go straight for the details, the 'details' link can lead you right to this trait's place on the chromosome.",
    placement: 'top',
    target: function() {
      return jQuery("[href='?pane=qtl_details']")[0];
    }, 
    onNext: function() {
	jQuery("[href='?pane=qtl_details']")[0].click();
	lisTours.wakeup();}
  }, {
    title: 'QTL Tour: Nearest Marker',
    content: 'This is the marker that had the strongest association with variation in the trait for this QTL, among those used in the mapping experiment. Since the marker has sequence information associated with it, we can find its position in the genome sequence to find the general region in which the gene responsible for the QTL may be found- note, however that the marker is not guaranteed to be very close to any candidate gene, and you should use this only as a very general guide.',
    placement: 'bottom',
    target: function() {
      return jQuery("#tripal_feature-table-base > tbody > tr:nth-child(2) > td")[1];
    },
    multipage: true,
    onNext: function() {
      jQuery("#tripal_feature-table-base > tbody > tr:nth-child(2) > td > a")[0].click();
      //lisTours.location('/feature/Phaseolus/vulgaris/genetic_marker/BM199')}
    }
  }, {
    title: 'QTL Tour: Marker Overview',
    content: 'The "Overview" links to articles and descriptions of the marker.To find this marker on the phaseolus map, we can look under "Marker Positions".',
    target: function() {
     return jQuery("[href='?pane=positions']")[0];
    },
    placement: 'bottom',
    multipage: true,
    onNext: function() {
      lisTours.location('/feature/Phaseolus/vulgaris/genetic_marker/BM199?pane=positions');
    }
  }, {
    title: 'QTL Tour: Genome Browser',
    content: 'The linked Gbrowse map will show you annotations on the genome',
    target: function() {
      return jQuery("[href='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red']")[0];
    },
    placement: 'top',
    arrowOffset: '220', 
    xOffset: '-200', 
    multipage: true,
    onNext: function() {
      lisTours.location('/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red');
    }
  }, {
    title: 'QTL Tour: Gbrowse',
    content: 'Allows you to visualize syntenic relationships between legumes of your choice. The red bar is the lowest flanking marker for "seed yield".',
    target: function() {
      return jQuery('#frameviewer').contents().find('#track_centromere')[0];
    },
    placement: "top",
    onNext: function() {
      lisTours.wakeup();
    }
  },{
    title: 'QTL Tour: Our track',
    content: 'Here is the lowest flanking marker, BM199. All the tracks can be dragged to rearrange them.',
    target: function() {
      return jQuery("#frameviewer").contents().find("#centromere_image")[0];
    },
    placement: 'top',
    yOffset: '160',
    xoffset: '200',
    onNext: function() {
	lisTours.wakeup();
    }
  }, {
    title: 'QTL Tour: Settings',
    content: 'You can choose which tracks to display through the navigation bar.',
    target: function() {
	return jQuery("#frameviewer").contents().find("#main_page_select")[0];
    },
    placement: 'top',
    yOffset: '155',
    xOffset: '200'
  }
],
  //showPrevButton: true,
  onError: function(e) {
    console.log('error: ' + e);
  },
};


