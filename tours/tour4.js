
tourId = 'tour4';

var tour = {
	id: 'tour4',
	steps: [
       {
	title: 'practice',
	content: 'break the iframe',
	target: 'site-name',
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		window.location='/gbrowse_phavu1.0?query=ref=Pv04;start=15056944;stop=15058034;add=Pv04+Marker+BM199+15056944..15057534;h_feat=BM199@yellow;style=Marker+bgcolor=red';
		console.log(hopscotch.getCurrStepNum());
		function waitForifrm(){
		var iframe = document.getElementById('#frameviewer'),
		iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
		if (iframeDoc.readyState == 'complete') {
			iframe.contentWindow.onload = function() {
			hopscotch.startTour("tour4", 1);}}
		else setTimeout(waitForifrm, 300);
		}}
    }, {
	title: 'gbrowse',
	content: 'at the page',
	target: 'site-name',
	dynamicContent: 'dynamic',
	dynamicTarget: function() {
debugger;
	return jQuery('#frameviewer').contents().find('#track_centromere')[0];
		},
	placement: 'bottom',
	multipage: true,
	onNext: function() {
		console.log(jQuery('#frameviewer').contents().find('#track_centromere'));
		lisTours.go("tour4", 2);}
    }, {
	title: 'iframe',
	content: 'inside',
	target: jQuery('#frameviewer').contents().find('#track_centromere')[0],
	placement: 'top'
     }, {
	title: 'iframe2',
	content: 'pushing the luck',
	target: jQuery('#frameviewer').contents().find('#regionselectBox')[0],
	placement: 'bottom'
     }


]}
