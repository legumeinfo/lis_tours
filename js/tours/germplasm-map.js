(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: 'germplasm-map',
    debug: true,
    orphan: true,
    steps : [
      {
        title: 'Germplasm Map',
        content: 'todo...',
        placement: 'bottom',
        element: '#site-name',
  reflex: true,
      }
    ]
  });

  lisTours.register(tour);

}(window.__jquery));
