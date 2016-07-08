var tour = {
  'id': 'tour99',
  'steps' : [
    {
      title: 'Welcome to LIS!',
      content: 'Clicking "next" will take you to our homepage, where the tour will begin.',
      placement: 'bottom',
      target: 'site-name',
      multipage: true,
      onNext: function() {
	lisTours.location('/');
      }
    },
    {
      title: 'Homepage',
      content: 'Clicking "next" will take you to germplasm/map',
      placement: 'bottom',
      target: 'site-name',
      multipage: true,
      onNext: function() {
	lisTours.location('/germplasm/map');
      }
    },
    {
      title: 'Germplasm Map',
      content: 'After you are done looking at the germplasm map, click next.',
      placement: 'bottom',
      target: function() {
	return jQuery('#search-btn')[0];
      },
      multipage: true,
      onNext: function() {
	lisTours.location('/');
      }
    },
    {
      title: 'Welcome to (back) LIS!',
      content: 'All Done',
      placement: 'bottom',
      target: 'site-name',
    }
]
};


