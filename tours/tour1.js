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
    'title': 'Welcome to LIS!',
    'content': 'Clicking "next" will take you to our homepage.',
    'placement': 'bottom',
    'target': 'site-name',
    'multipage': 'true',
    'onNext': function() {
      window.location = '/home'}
}, {
    'title': 'Some guidance',
    'content': 'This tour will provide an example for how one could use our tools to improve their crops.',
    'placement': 'bottom',
    'target': jQuery("[href='/search/qtl']")[0] || 'site-name',
    'multipage': 'true',
    'onNext' : function() {
      window.location = '/search/qtl';
    },
}, {
    'title': 'Given: A QTL.',
    'content': 'Let us assume we are working with a "seed yield" QTL.',
    'placement': 'bottom',
    'target': jQuery("[href='/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5']")[0] || 'site-name',
    'onNext' : function() {
	window.location = '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5';}
},{
    'title': 'The Overview',
    'content': "Here you can find out more about this trait's  place on the chromosome.",
    'placement': 'top',
    'target': jQuery("[href='?pane=qtl_details']") [0] || 'site-name',
    'onNext': function() {
	window.location = '/feature/Phaseolus/vulgaris/QTL/phavu.Seed-yield-2-5#pane=qtl_details'}
},{
    'title': 'Nearest Marker',
    'content': 'This is the closest known gene to the segment of DNA that contributes to the seed yield phenotype. Since we know that neighboring alleles tend to be inherited together, we can use markers to find specific traits in chromosomes.',
    'placement': 'top',
    'target': jQuery("[href='/node/1360413']")[0] || 'site-name',
    'multipage': 'true',
    'onNext': function() {
	window.location= '/node/1360783#pane=marker'}
},{
    'title': 'Marker Overview',
    'content': 'The "Overview" links to articles and descriptions of the marker.To find this marker on the phaseolus map, we can look under "Marker Positions".',
    'target': jQuery("[href='?pane=positions'")[0],
    'placement': 'bottom',
    'multipage': 'true',
    'onNext': function() {
	window.location='/node/1360783?pane=positions'}
},{
    'title': 'Genome Browser',
    'content': 'The linked Gbrowse map will show you annotations on the genome',
    'target': jQuery("[href='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red']")[0],
    'placement': 'left', 
    'multipage': 'true',
    'onNext': function() {
	window.location='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red'; 
        //function test(){ console.log(jQuery("#frameviewer").contents());}
	setTimeout(this, [1000]);}
},{
    'title': 'Gbrowse',
    'content': 'Allows you to visualize syntenic relationships between legumes of your choice. The red bar is the lowest flanking marker for "seed yield".',
    'target': 'site-name',
    'placement': "bottom"
},{
    'title': 'Tweaking your parameters',
    'content': 'There are many ways to change your settings, such as rearranging and adding tracks, zooming in or out, and changing specific visibilities.',
    'target': jQuery("frameviewer").contents().getElementsById("#panels")[0],  //(".field-items")[0],
    'placement': 'top'
}  

 ],
showPrevButton: true,
};


