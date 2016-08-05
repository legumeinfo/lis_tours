(function(jQuery) {

  var $ = jQuery;

  var tour = new Tour({
    name: 'phylotree',
    debug: true,
    orphan: true,
    steps : [
      {
        title: 'Phylotree',
        content: 'todo...',
        placement: 'bottom',
        element: '#site-name',
  reflex: true,
      }
    ]
  });

  lisTours.register(tour);

}(window.__jquery));
