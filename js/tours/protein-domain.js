// TODO: porting from hopscotch to bootstrap-tours.
'use strict';

(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: 'protein-domain',
    orphan: true,
    debug: true,  
    steps: [
      {
	title: 'Welcome to LIS',
	content: "Let's start at the homepage",
	element: '#site-name',
	placement: 'bottom',
      },{
	title: 'Proteins',
	content: 'We will be starting from the Protein Domains tool. We want to find out more about the domain LysM found in a class of receptor-like kinases, that are proposed to control bacterial entry in signaling pathways relating to pathogen defense and symbiont recognition. This is a useful element in the study of the symbiotic relationships of legumes with nitrogen-fixing bacteria.',
	element: jQuery("a:contains('Protein Domains')")[0],
	placement: 'bottom',
	path: '/home'
      },{
	title: 'Starting Goal',
	content: "We will input the domain name LysM from our gene medtr.Medtr8g078300, which codes for LysM RLK4 to see where it is present in other legume species.",
	element: '#edit-cvterm-name',
	placement: 'bottom',
	path: '/search/protein_domains?cvterm_name=LysM',
      },{
	title: 'Protein Tour: Interpro',
	content: 'We\'ve gotten matches from two protein domain databases, but both belong to the same Interpro classification.',
	//element: jQuery("#block-system-main > div > div > div.view-content > table > thead > tr > th.views-field.views-field-IPRterm")[0],
	element: jQuery("th.views-field.views-field-IPRterm")[0],
	placement: 'top',
      },{
	title: 'Protein Tour: More Genes',
	content: 'We will look for occurrences of this domain in Lotus japonicus.',
	element: jQuery("[title~='Lotja']")[0],
	placement: 'top',
      },{
	title: 'Protein Tour: Lotja genes',
	content: 'Here you can pick which combination of proteins in the lotus you would like to further inspect.',
	element: jQuery('.views-field-description')[0],
	placement: 'top',
	path: '/search/gene?abbreviation=lotja&domains=PF01476'
      },{
	title: 'Protein Tour: Genes',
	content: 'Clicking on the gene will take you to the gene details page, where you can see the structure of the gene in its genomic context.',
	element: jQuery("[href='/feature/Lotus/japonicus/gene/Lj0g3v0306419']")[0] || jQuery("#block-system-main > div > div > div.view-content > table > tbody > tr:nth-child(7) > td.views-field.views-field-name.active > a"),
	placement: 'top'
      },{
	title: 'Protein Tour: Basket',
	content: 'By adding the gene to the basket you can access its mRNA and polypeptide sequence.',
	element: jQuery("[href='/basket/add/4468488/nojs/?destination=search/gene%3Fabbreviation%3Dlotja%26domains%3DPF01476']")[0] || jQuery("#ajax-link--7"),
	placement: 'top',
      },{
	title: 'Protein Tour: Phylotree',
	content: 'The phytozome link will take you to the phylogeny tree rooted on the PF01476 domain',
	element: '#block-system-main > div > div > div.view-content > table > tbody > tr:nth-child(7) > td.views-field.views-field-gene-family > a',
	placement: 'top',
      },{
        title: 'Protein Tour: Phylotree',
        content: 'Please be patient, as the phylogram chart loads...',
        placement: 'top',
        onShown: function(tour) {
          $('.popover-navigation div').hide();
          // wait for dynamic content with a loading dialog.
          var deferred = lisTours.waitForSelector(tour,'#phylogram g > :contains("lotja.Lj0g3v0306419.1"):first'	);
          // advance automatically to next step when done loading
          deferred.then(function() {
            tour.next();
          });
          return deferred.promise();
        }
      },{
	title: 'Protein Tour: Gene Tree',
	content: 'Here is the gene in a phylogenetic context.',
	element: '#phylogram > svg > g > :contains("lotja.Lj0g3v0306419.1"):first',
	placement: 'bottom',
	path: '/chado_phylotree/phytozome_10_2.59131567?hilite_node=lotja.Lj0g3v0306419.1'
      }
    ]
  });
  
  lisTours.register(tour);
  
}(window.__jquery));
