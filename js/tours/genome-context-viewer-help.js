/* This tour should start via the help button on the context viewer
 *  app. It detects if the context viewer is in 'basic' mode, and if
 *  so prompts the user to redirect to the typical search mode, which
 *  the genome-context-viewer tour is written for.
 */

(function(jQuery) {

  var $ = jQuery;

    var EXAMPLE_URL = "/lis_context_viewer/index.html#/search/lis/phavu.Phvul.002G085200?numNeighbors=10&numMatchedFamilies=4&numNonFamily=5&algorithm=repeat&match=10&mismatch=-1&gap=-1&score=30&threshold=25&track_regexp=&order=distance&sources=lis";

  var promptStep = {
    title: 'Please note',
    content: 'To view the Context Viewer help and interactive tour, you will be redirected to an example Search view, instead of the Basic view. Press the <strong>Next</strong> button to continue, or <strong>End Tour</strong> to stay on the current Basic view.',
    onNext: function(tour) {
      lisTours.go('genome-context-viewer');
      document.location.href = EXAMPLE_URL;
      return (new $.Deferred()).promise();
    }
  };

  var tour = new Tour({
    name: 'genome-context-viewer-help',
    debug: true,
    orphan: true,
    template: lisTours.template.noPrevBtnTemplate,
    steps: [
        {
          title: 'Help',
          content: '...',
	  onShow: function(tour) {
	    // check if we are in basic mode or search modes
	    if(document.location.hash.indexOf('/basic') !== -1) {
	      // we are in basic mode, so prompt user and dont disrupt
	      // their browsing of the current view.
	      tour.addStep(promptStep);
	      tour.addStep(promptStep);
	      setTimeout( function() { tour.next(); });
	    }
	    else {
	      // we are already in search mode, so proceed with
	      // loading the actual genome-context-viewer tour.
	      lisTours.go('genome-context-viewer');
	      return (new $.Deferred()).promise();
	    }
	  },
        }
    ],
  });

  lisTours.register(tour);

}(window.__jquery));

