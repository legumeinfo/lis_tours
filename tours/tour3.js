//Blast tour
tourId = "tour3"

var tour = {
	id: "tour3",
	steps: [
	{
	title: 'BLAST Tour: Welcome to LIS',
	content: 'Click "next" to go to the homepage',
	target: 'site-name',
	placement: 'right',
	multipage: true,
	onNext: function() {
		window.location='/home';}
     }, {
	title: 'BLAST Tour: Search your sequence against our database',
	content: 'We have BLAST on our webpage for your legume-browsing convenience.',
       target: jQuery("[href='/blast']")[1],
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/blast';}
    }, {
	title: 'BLAST Tour: Protein BLAST',
	content: 'Pick the version of the blast algorithm that is appropriate given the type (nucleotide or protein) of input sequence you have and the type ofthe sequences in the database you want to search.  We will use blastp to search one of the LIS protein databases with a protein query sequence.',
	target: jQuery("[href='/./blast/protein/protein']")[0],
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/blast/protein/protein';}
    }, {
	title: 'BLAST Tour: Begin the Alignment',
	content: 'We will be using the sample sequence, so tick the checkbox to display it.',
	target: jQuery('#edit-example-sequence')[0],
	placement: 'top',
	showNextButton: false,
	nextOnTargetClick: true
	//onNext: function() {
	//	jQuery('#edit-example-sequence').click();}//trigger('click');}
    }, {
	title: 'BLAST Tour: Select database',
	content: 'Select the Cicer arietinum CDC Frontier database to compare sequence against.',
	target: 'edit-select-db',
	placement: 'top',
	nextOnTargetClick: true,
        showNextButton: false,
	//onNext: function() {
	//	window.location='/blast/report/ODE2#loaded/';}
    }, { 
	title: 'BLAST Tour: Blast it',
	content: 'Click the "BLAST" button to continue to results.',
	target: jQuery('#edit-submit')[0],
	placement: 'bottom',
	multipage: true,
        showNextButton: false,
	nextOnTargetClick: true
    }, {
	title: 'BLAST Tour: Results',
	content: 'The E-value, or expected value, describes the probability that the results are by chance. A lower e-value suggests that the two sequences are more identical, and a "0" suggests that there is no possibility that these are two random sequences, they must be identical.',
	target: jQuery('.evalue')[0],
	placement: 'top',
	arrowOffset: '250',
	xOffset: '-230',
	onNext: function() {
		jQuery('.arrow-col').trigger('click');}
    }, {
	title: 'BLAST Tour: Positive Score',
	content: 'This is the percentage of positive scores that came up on the substitution matrix.',
	delay: '400',
	target: jQuery('.positive')[0],
	placement: 'bottom'
    }, {
	title: 'BLAST Tour: Identity',
	content: 'This scores how alike the two sequences are.',
	target: jQuery('.identity')[0],
	placement: 'bottom'
    }, {
	title: 'BLAST Tour: Target Information',
	content: 'Clicking the target name will take you to that gene\'s GBrowse page, where you can see its synteny with other legumes.',
	target: jQuery("#blast_report > tbody > tr:nth-child(1) > td.hit > a")[0],
	placement: 'bottom'
    }, {
	title: 'BLAST Tour: Continuing',
	content: 'We can learn more about our chickpea target, Ca_09040, by entering it into a gene search query.',
	target: jQuery("[href='/search']")[0],
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/search/gene?name=Ca_09040';}
    }, {
	title: 'BLAST Tour: Our Chickpea Gene',
	content: 'Searching for gene and gene family information',
	target: 'edit-name',
	placement: 'bottom'
    }, {
	title: 'BLAST Tour: Using the Gene Basket',
	content: 'Click "Add to Basket" if you would like to save copies of mRNA sequences to compare.',
	target: jQuery('#ajax-link')[0],
	placement: 'top',
	arrowOffset: '230',
	xOffset: '-200'
    }, {
	title: 'BLAST Tour: Gene Info',
	content: 'Let\'s gather some more information on our gene',
	target: jQuery("#block-system-main > div > div > div.view-content > table > tbody > tr.odd.views-row-first > td.views-field.views-field-name.active > a")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/feature/Cicer/arietinum/gene/Ca_09040_gene';}
    }, {
	title: 'BLAST Tour: GBrowse',
	content: 'Here we can see our chickpea gene and choose tracks to add to the visualization.',
	delay: '400',
	target: jQuery('#frameviewer') [0],
	placement: 'top',
    }, {
	title: 'BLAST Tour: Let\'s look at some more genes',
	content: 'We can also find related genes in the phylotree viewer.',
	target: jQuery("#tripal_feature-table-base > tbody > tr:nth-child(4) > td > a")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/chado_phylotree/phytozome_10_2.59198402?hilite_node=cicar.Ca_09040';}
    }, {
	title: 'BLAST Tour: Family Tree',
	content: 'Here is Ca_09040 next to a closely related barrel medick gene.',
	target: function() {
	  return jQuery('.hilite-node')[0]},
	placement: 'right',
	yOffset: '-22'
    }

]
}
