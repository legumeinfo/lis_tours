var tour = {
  'id': 'tour2',
  'steps' : [ {
    'title': 'hello tour 2',
    'content': 'This is the tour launching page.',
    'placement': 'bottom',
    'target': 'site-name',
    'onNext': function() {
      window.location = '/home';
    }
  }, {
    'title': 'hello tour 2..',
    'content': 'This is the home page.',
    'placement': 'bottom',
    'target': 'site-name',
    'onNext' : function() {
      window.location = '/organism/Vigna/unguiculata';
    },
  }, {
    'title': 'hello tour 2...',
    'content': 'Cowpeas!',
    'placement': 'bottom',
    'target': jQuery('.tripal-organism-img')[0] || 'site-name',
  }
 ]
}

