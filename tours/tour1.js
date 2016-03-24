var tour = {
  'id': 'tour1',
	
	function($) {
	var tourState = hopscotch.getState(tourId);
	if(tourState !== null && tourState != undefined) {
		return; }
	$(document).ready(waitForiFrame);
console.log("waited for it");
		function waitForiFrame() {
		if(!$('#frameviewer').length ||!('$("#frameviewer").contentWindow.document.body.innerHTML').length){
		setTimeout(waitForiFrame, 2000);
		return;}}},

  'steps' : [ {
    title: 'Welcome to LIS!',
    content: 'Clicking "next" will take you to our homepage.',
    placement: 'bottom',
    target: 'site-name',
    multipage: true,
    onNext: function() {
      window.location = '/home'}
}, {
    title: 'Some guidance',
    content: 'This tour will provide an example for how one could use our tools to improve their crops.',
    placement: 'bottom',
    target: jQuery("[href='/search/qtl']")[0] || 'site-name',
    multipage: true,
    onNext : function() {
      window.location = '/search/qtl';
    }
}, {
    title: 'QTL Search',
    content: 'In this tour we will begin by searching for a QTL: quantitative trait locus.This is a location on DNA that correlates with a specific phenotypic variance.',
    placement: 'bottom',
    target: 'edit-qtl-symbol',
    multipage: true,
    onNext: function() {
	window.location='/search/qtl?organism=Phaseolus%20vulgaris&trait_class=All&expt_pub_symbol_op=%3D&expt_pub_symbol=&qtl_symbol_op=%3D&qtl_symbol=seed_yield';}
}, {
    title: 'Given: A QTL.',
    content: 'Let\'s look for a "seed yield" QTL.',
    target: jQuery("[href='/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5']")[0] || 'site-name',
    placement: 'bottom',
    multipage: true,
    onNext : function() {
	window.location = '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5';}
},{
    title: 'The Overview',
    content: "To go straight for the details, the 'details' link can lead you right to this trait's  place on the chromosome.",
    placement: 'top',
    target: jQuery("[href='?pane=qtl_details']") [0] || 'site-name',
    onNext: function() {
	window.location = '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5#pane=qtl_details'}
},{
    title: 'Nearest Marker',
    content: 'This is the closest identifiable DNA sequence to the gene that contains the seed yield phenotype. Since we know that neighboring alleles tend to be inherited together, we can use markers to find specific traits in chromosomes.',
    placement: 'top',
    target: jQuery("[href='/node/1360413']")[0] || 'site-name',
    multipage: true,
    onNext: function() {
	window.location= '/node/1360783#pane=marker'}
},{
    title: 'Marker Overview',
    content: 'The "Overview" links to articles and descriptions of the marker.To find this marker on the phaseolus map, we can look under "Marker Positions".',
    target: jQuery("[href='?pane=positions'")[0],
    placement: 'bottom',
    multipage: true,
    onNext: function() {
	window.location='/node/1360783?pane=positions'}
},{
    title: 'Genome Browser',
    content: 'The linked Gbrowse map will show you annotations on the genome',
    target: jQuery("[href='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red']")[0] || 'site-name',
    placement: 'right', 
    multipage: true,
    onNext: function() {
	window.location='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red'; 
        //function test(){ console.log(jQuery("#frameviewer").contents());}
	setTimeout(this, [1000]);
	lisTours.go("tour1", 7);}
},{
    title: 'Gbrowse',
    content: 'Allows you to visualize syntenic relationships between legumes of your choice. The red bar is the lowest flanking marker for "seed yield".',
    target: jQuery('#frameviewer').contents().find('#track_centromere')[0],
    placement: "bottom",
  },{
    title: 'Tweaking your parameters',
    content: 'There are many ways to change your settings, such as rearranging and adding tracks, zooming in or out, and changing specific visibilities.',
    target: jQuery("#frameviewer").contents().find(".inner_div[name='track_ace854_My_Track_1_image']")[0],  //(".field-items")[0],
    placement: 'top'
}  

 ],
showPrevButton: true,
};


