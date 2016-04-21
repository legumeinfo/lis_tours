var tour = {
  'id': 'tour1',
  'steps' : [ {
    title: 'Welcome to LIS!',
    content: 'Clicking "next" will take you to our homepage.',
    placement: 'bottom',
    target: 'site-name',
    multipage: true,
    onNext: function() {
      window.location = '/home';
    }
  }, {
    title: 'QTL Tour: Some guidance',
    content: 'This tour will provide an example for how one could use our tools to improve their crops.',
    placement: 'bottom',
    target: function() {
      return jQuery("[href='/search/qtl']")[0];
    },
    multipage: true,
    onNext : function() {
      window.location = '/search/qtl';
    },
  }, {
    title: 'QTL Tour: QTL Search',
    content: 'In this tour we will begin by searching for a QTL. This is a location on DNA that correlates with a specific phenotypic variance.',
    placement: 'bottom',
    target: 'edit-qtl-symbol',
    multipage: true,
    onNext: function() {
      window.location='/search/qtl?organism=Phaseolus%20vulgaris&trait_class=All&expt_pub_symbol_op=%3D&expt_pub_symbol=&qtl_symbol_op=%3D&qtl_symbol=seed_yield';
    }
  }, {
    title: 'QTL Tour: Given: A QTL.',
    content: 'Let\'s look for a "seed yield" QTL.',
    target: function() {
      return jQuery("[href='/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5']")[0]; 
    },
    placement: 'bottom',
    multipage: true,
    onNext : function() {
      window.location = '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5';}
  }, {
    title: 'QTL Tour: The Overview',
    content: "To go straight for the details, the 'details' link can lead you right to this trait's  place on the chromosome.",
    placement: 'top',
    target: function() {
      return jQuery("[href='?pane=qtl_details']")[0];
    },
    onNext: function() {
	lisTours.wakeup();}
  }, {
    title: 'QTL Tour: Nearest Marker',
    content: 'This is the closest identifiable DNA sequence to the gene that contains the seed yield phenotype. Since we know that neighboring alleles tend to be inherited together, we can use markers to find specific traits in chromosomes.',
    placement: 'top',
    target: function() {
      return jQuery("[href='/node/1360413']")[0];
    },
    multipage: true,
    onNext: function() {
      window.location= '/node/1360783#pane=marker'}
  }, {
    title: 'QTL Tour: Marker Overview',
    content: 'The "Overview" links to articles and descriptions of the marker.To find this marker on the phaseolus map, we can look under "Marker Positions".',
    target: function() {
     return jQuery("[href='?pane=positions'")[0];
    },
    placement: 'bottom',
    multipage: true,
    onNext: function() {
      window.location = '/node/1360783?pane=positions';
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
      window.location = '/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red';
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
      return jQuery("#frameviewer").contents().find("#track_0b5f86_My_Track_1_image")[0];
    },
    placement: 'top',
    yOffset: '180',
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
    yOffset: '173',
    xOffset: '200'
  }
],
  //showPrevButton: true,
  onError: function(e) {
    console.log('error: ' + e);
  },
};


