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
	content: 'Search the LIS protein database',
	target: jQuery("[href='/./blast/protein/protein']")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/blast/protein/protein';}
    }, {
	title: 'BLAST Tour: Begin the Alignment',
	content: 'We will use a sample sequence, Glyma.02g227200.1 fatty acid desaturase 8.',
	target: jQuery('#fasta-textarea')[0],
	placement: 'top',
	onNext: function() {
		jQuery('#edit-example-sequence').trigger('click');}
    }, {
	title: 'BLAST Tour: Blast it',
	content: 'Select a database to compare sequence against. We will compare against the chickpea, Cicer arietinum.',
	target: 'edit-select-db',
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/blast/report/ODQ3#loaded/';}//ODE0# previously
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
	target: jQuery("[href='/gbrowse_cicar1.0?query=h_feat=Query_1;q=Ca_09040']")[0],
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
	target: '#edit-name',
	placement: 'bottom'
    }, {
	title: 'BLAST Tour: Using the Gene Basket',
	content: 'Click "Add to Basket" if you would like to save copies of mRNA sequences to compare.',
	target: jQuery('#add2basket-link-1132520')[0],
	placement: 'top',
	arrowOffset: '230',
	xOffset: '-200'
    }, {
	title: 'BLAST Tour: Gene Info',
	content: 'Let us gather some more information on our gene',
	target: jQuery("[href='/search/gene?name=Ca_09040&abbreviation=All&domains_op=contains&domains=&description_op=word&description=&gene_family_op=%3D&gene_family=&name_op=contains&submit_basket=Add%20all%20genes%20to%20Basket&order=name&sort=desc']")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/feature/Cicer/arietinum/gene/Ca_09040_gene';}
    }, {
	title: 'BLAST Tour: GBrowse',
	content: 'Here we can see our chickpea gene and choose tracks to add to the visualization.',
	delay: '400',
	target: jQuery('#frameviewer') [0] || 'site-name',
	placement: 'top',
    }, {
	title: 'BLAST Tour: Let\'s look at some more genes',
	content: 'We can also find related genes in the phylotree viewer.',
	target: jQuery("[href='/chado_gene_phylotree_v2/Ca_09040_gene']")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/chado_phylotree/phytozome_10_2.59198402?hilite_node=cicar.Ca_09040';}
    }, {
	title: 'BLAST Tour: Family Tree',
	dynamicContent: 'Here is Ca_09040 next to a closely related barrel medick gene.',
	dynamicTarget: function() {
	  return jQuery('.hilite-node')[0]},
	content: 'Please wait while page loads...',
	target: 'site-name',	
	placement: 'right',
	yOffset: '-22'
    }

]
}
