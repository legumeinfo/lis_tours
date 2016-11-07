// TODO: finish porting tour steps from hopscotch  to bootstrap-tours.

'use strict';

(function(jQuery) {

  var $ = jQuery;
  var SELECTOR = {
    welcome: '#site-name',
    searchBtn: '[href="/blast"]',
    proteinBlast: 'a:contains("blastp")',
    exampleSequence: '#edit-example-sequence',
  };

  var tour = new Tour({
    name: "blast-demo",
    orphan: true,
    //debug: true,
    steps: [
      {
        title: 'BLAST Tour: Welcome to LIS',
        content: 'Let\'s go the legumeinfo.org homepage, where the BLAST Tour will begin.  Use the Next button or &#8594; (right arrow key) to advance the tour.',
        element: SELECTOR.welcome,
        placement: 'bottom',
        reflex: true,
      }, {
        title: 'BLAST Tour: Search your sequence against our database',
        path: '/home',
        content: "This tour will provide an example of navigating LIS starting with sequence data, using similarity search tools to find homologous sequence content in LIS. These matched sequences can be explored with respect to their functional annotation and placement in gene families, providing insights into likely properties of the initial sequences.<br> Now press the BLAST button, or use the Next button or press &#8594;.",
	    element: jQuery(SELECTOR.searchBtn)[1],
        placement: 'bottom',
        reflex: 'true'
      }, {
        title: 'BLAST Tour: Protein BLAST',
        content: 'Pick the version of the blast algorithm that is appropriate given the type (nucleotide or protein) of input sequence you have and the type of the sequences in the database you want to search.  We will use blastp to search one of the LIS protein databases with a protein query sequence.',
        path: '/blast',
        element: SELECTOR.proteinBlast,
        placement: 'bottom',
        reflex: 'true'
      }, {
        title: 'BLAST Tour: Begin the Alignment',
        content: 'We will be using the sample sequence, so click the checkbox in order to display it.',
        element: SELECTOR.exampleSequence,
        path: '/blast/protein/protein',
        placement: 'top',
        //force the user to click the checkbox themselves; note that this hiding
        //does not actually disable the prev/next functionality so this isn't a
        //perfect approach
        onShown: function(tour) {
              $('.popover-navigation div').hide();
        },
        reflex: true
      }, {
        title: 'BLAST Tour: Select database',
        content: 'Select the Cicer arietinum CDC Frontier database to compare sequence against.',
        element: '#edit-select-db',
        placement: 'top',
        reflex: true,
        //force the user to click the checkbox themselves; note that this hiding
        //does not actually disable the prev/next functionality so this isn't a
        //perfect approach
        onShown: function(tour) {
          $('.popover-navigation div').hide();
        },
      }, { 
        title: 'BLAST Tour: Blast it',
        content: 'Click the "BLAST" button to continue to results.',
        element: jQuery('#edit-submit')[0],
        placement: 'bottom',
        reflex: true,
        onShown: function(tour) {
              $('.popover-navigation div').hide();
        },
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
        content: 'Results are sorted by E-value, or expected value, which is related to the probability that the match score could have resulted from chance rather than homology. A lower e-value suggests a higher probability that two sequences are related; the limiting value of "0" implies near certainty that the match is due to shared ancestry.',
        element: jQuery('.evalue')[0],
        placement: 'top',
        reflex: true
      }, {
        title: 'BLAST Tour: Result Details',
        content: 'Matched sequence names can be clicked to reveal more detail about the alignment behind the match.',
        element: jQuery('.arrow-col')[0],
        onNext: function() {
          jQuery('.arrow-col').trigger('click');
        },
        placement: 'top'
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
      }, {
        title: 'BLAST Tour: GBrowse',
        content: 'Here we can see our chickpea gene and choose tracks to add to the visualization.',
        element: jQuery('#frameviewer') [0],
        placement: 'top',
        path: '/feature/Cicer/arietinum/gene/Ca_09040_gene'
      }, {
        title: 'BLAST Tour: Let\'s look at some more genes',
        content: 'We can also find related genes in the phylotree viewer.',
        element: jQuery('#tripal_feature-table-base > tbody > tr:nth-child(4) > td > a')[0],
        placement: 'top',
      },{
         title: 'BLAST: Phylotree',
         //NB: currently, this must use path instead of click on the
         //link element due to the fact that these are being made into
         //external absolute links to legumeinfo.org probably due to
         //peanutbase
         path: '/chado_phylotree/phytozome_10_2.59198402?hilite_node=cicar.Ca_09040',
         content: 'Please be patient, as the phylogram chart loads...',
         placement: 'top',
         onShown: function(tour) {
           $('.popover-navigation div').hide();
           // wait for dynamic content with a loading dialog.
           var deferred = lisTours.waitForSelector(tour, '#phylogram > svg > g > :contains("cicar.Ca_09040"):first');
           // advance automatically to next step when done loading
           deferred.then(function() {
             tour.next();
           });
           return deferred.promise();
         }
      }, {
        title: 'BLAST Tour: Family Tree',
        content: 'Here is Ca_09040 next to a closely related Medicago truncatula gene. We can infer that our starting sequence is likely to be nearby in the tree as well.',
        element:'#phylogram > svg > g > :contains("cicar.Ca_09040"):first', 
        placement: 'bottom'
      }, {
        title: 'BLAST Tour: The End',
        content: 'Congratulations, you\'ve made it to the end of the Gene Tour. Please let us know if you have any suggestions on how to improve the tools used in this tour or the tour itself by using our Contact form. Now press End Tour.' ,
        element: SELECTOR.contact,
        reflex: true,
        placement: 'bottom'
      }

    ]
  });
  
  lisTours.register(tour);
  
}(window.__jquery));

