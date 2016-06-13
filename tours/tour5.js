tourId = 'tour5';

var tour = {
	id: 'tour5',
	steps: [
       {
	title: 'Welcome to LIS',
	content: "Let's start at the homepage",
	target: 'site-name',
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/home';}
     },{
	title: 'Proteins',
	content: 'We will be starting from the Protein Domains tool. We want to find out more about the domain LysM RLK, a protein that is proposed to control bacterial entry. This is a useful element in the study of the symbiotic relationships of legumes with nitrogen-fixing bacteria.',
	target: jQuery("a:contains('Protein Domains')")[0],
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/search/protein_domains';}
     },{
	title: 'Starting Goal',
	content: "We will input the IPR term, IPR018392, from our gene medtr.Medtr8g078300, which codes for LysM RLK4 to see where it is present in other legume species.",
	target: 'edit-iprterm',
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/search/protein_domains?IPRterm=IPR018392';}
     },{
	title: 'Protein Tour: More Genes',
	content: 'We will look for occurances of this domain in Lotus Japonicus.',
	target: jQuery("[title~='Lotja']")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/search/gene?abbreviation=lotja&domains=PF01476';}
     },{
	title: 'Protein Tour: Lotja genes',
	content: 'Here you can pick which combination of proteins in the lotus you would like to further inspect.',
	target: jQuery('.views-field-description')[0],
	placement: 'top'
     },{
	title: 'Protein Tour: Genes',
	content: 'Clicking on the gene will take you to the jBrowse page',
	target: jQuery("[href='/feature/Lotus/japonicus/gene/Lj0g3v0306419']")[0],
	placement: 'top'
     },{
	title: 'Protein Tour: Basket',
	content: 'By adding the gene to the basket you can access its mRNA and polypeptide sequence.',
	target: jQuery("[href='/basket/add/4468488/nojs/?destination=search/gene%3Fabbreviation%3Dlotja%26domains%3DPF01476']")[0],
	placement: 'top',
	xOffset: '-200',
	arrowOffset: '230'
     },{
	title: 'Protein Tour: Phylotree',
	content: 'The phytozome link will take you to the phylogeny tree rooted on the PF01476 domain',
	target: jQuery("[href='/feature/Lotus/japonicus/gene/Lj0g3v0306419']")[0],
	placement: 'top',
	multipage: true,
	onNext: function() {
		window.location='/chado_phylotree/phytozome_10_2.59131567?hilite_node=lotja.Lj0g3v0306419.1';}
     },{
	title: 'Protein Tour: Gene Tree',
	content: 'Here is the gene in a phylogenetic context.',
	target: jQuery('.hilite-node')[0],
	placement: 'right',
	yOffset: '-19'
     }


]}
