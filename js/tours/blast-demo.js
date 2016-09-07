// TODO: finish porting tour steps from hopscotch  to bootstrap-tours.

'use strict';

(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: "blast-demo",
    orphan: true,
    debug: true,
    steps: [
      {
	title: 'BLAST Tour: Welcome to LIS',
	content: 'Click "next" to go to the homepage',
	element: '#site-name',
	placement: 'right',
      }, {
	title: 'BLAST Tour: Search your sequence against our database',
        path: '/home',
	content: 'We have BLAST on our webpage for your legume-browsing convenience.',
	element: jQuery("[href='/blast']")[1],
	placement: 'bottom',
        reflex: 'true'
      }, {
	title: 'BLAST Tour: Protein BLAST',
	content: 'Pick the version of the blast algorithm that is appropriate given the type (nucleotide or protein) of input sequence you have and the type ofthe sequences in the database you want to search.  We will use blastp to search one of the LIS protein databases with a protein query sequence.',
	path: '/blast',
	element: jQuery("[href='/./blast/protein/protein']")[0],
	placement: 'bottom'
      }, {
	title: 'BLAST Tour: Begin the Alignment',
	content: 'We will be using the sample sequence, so tick the checkbox to display it.',
	element: jQuery('#edit-example-sequence')[0],
	path: '/blast/protein/protein',
	placement: 'top',
	onShown: function(tour) {
          $('.popover-navigation div').hide();},
	reflex: true
      }, {
	title: 'BLAST Tour: Select database',
	content: 'Select the Cicer arietinum CDC Frontier database to compare sequence against.',
	element: '#edit-select-db',
	placement: 'top',
	reflex: true,
	 onShown: function(tour) {
          $('.popover-navigation div').hide();},
      }, { 
	title: 'BLAST Tour: Blast it',
	content: 'Click the "BLAST" button to continue to results.',
	element: jQuery('#edit-submit')[0],
	placement: 'bottom',
        reflex: true,
	onShown: function(tour) {
          $('.popover-navigation div').hide();},
      },{
        title: 'BLAST Tour',
        content: 'Please be patient, as we wait for the query results to be returned...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          var deferred = lisTours.waitForContent(
            tour,
            function() {
              return $('#blast_report > thead > tr > th.query')[0];
            }, 40000);
          // advance automatically to next step when done loading
          deferred.then(function() {
            tour.next();
          });
          return deferred.promise();
        }
      }, {
	title: 'BLAST Tour: Results',
	content: 'The E-value, or expected value, describes the probability that the results are by chance. A lower e-value suggests that the two sequences are more identical, and a "0" suggests that there is no possibility that these are two random sequences, they must be identical.',
	element: jQuery('.evalue')[0],
	placement: 'top',
	onNext: function() {
	  jQuery('.arrow-col').trigger('click');
	},
	reflex: true
      }, {
	title: 'BLAST Tour: Positive Score',
	content: 'This is the percentage of positive scores that came up on the substitution matrix.',
	element: jQuery('.positive')[0],
	placement: 'bottom'
      },{ 
	title: 'BLAST Tour: Identity',
	content: 'This scores how alike the two sequences are.',
	element: jQuery('.identity')[0],
	placement: 'bottom'
      }, {
	title: 'BLAST Tour: Target Information',
	content: 'Clicking the element name will take you to that gene\'s GBrowse page, where you can see its synteny with other legumes.',
	element: jQuery("#blast_report > tbody > tr:nth-child(1) > td.hit > a")[0],
	placement: 'bottom'
      }, {
	title: 'BLAST Tour: Continuing',
	content: 'We can learn more about our chickpea element, Ca_09040, by entering it into a gene search query.',
	element: jQuery("[href='/search']")[0],
	placement: 'bottom',
	path: '/search/gene?name=Ca_09040'
      }, {
	title: 'BLAST Tour: Our Chickpea Gene',
	content: 'Searching for gene and gene family information',
	element: '#edit-name',
	placement: 'bottom'
      }, {
	title: 'BLAST Tour: Using the Gene Basket',
	content: 'Click "Add to Basket" if you would like to save copies of mRNA sequences to compare.',
	element: '#ajax-link',
	placement: 'top',
//	arrowOffset: '230',
//	xOffset: '-200'
      }, {
        title: 'BLAST Tour: GBrowse',
        content: 'Here we can see our chickpea gene and choose tracks to add to the visualization.',
        delay: '400',
        element: jQuery('#frameviewer') [0],
        placement: 'top',
	path: '/feature/Cicer/arietinum/gene/Ca_09040_gene'
      }, {
	title: 'BLAST Tour: Let\'s look at some more genes',
	content: 'We can also find related genes in the phylotree viewer.',
	element: jQuery("#tripal_feature-table-base > tbody > tr:nth-child(4) > td > a")[0],
	placement: 'top',
	path: '/chado_phylotree/phytozome_10_2.59198402?hilite_node=cicar.Ca_09040'
      }, {
	title: 'BLAST Tour: Family Tree',
	content: 'Here is Ca_09040 next to a closely related barrel medick gene.',
	element:'#phylogram > svg > g > rect.hilite-node :contains("cicar.Ca_09040"):last', 
	placement: 'left'
      }

    ]
  });
  
  lisTours.register(tour);
  
}(window.__jquery));

