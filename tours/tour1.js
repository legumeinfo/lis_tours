var tour = {
  'id': 'tour1',
  'steps' : [ {
    'title': 'hello tour 1',
    'content': 'This is the tour launching page.',
    'placement': 'bottom',
    'target': 'site-name',
    'onNext': function() {
      window.location = '/home';
    }
  }, {
    'title': 'hello tour 2',
    'content': 'This is the home page.',
    'placement': 'bottom',
    'target': 'site-name',
    'onNext' : function() {
      window.location = '/organism/Phaseolus/vulgaris';
    },
  }, {
    'title': 'hello tour3',
    'content': 'Frijoles!',
    'placement': 'bottom',
    'target': jQuery('.tripal-organism-img')[0] || 'site-name',
  }
 ]
}

