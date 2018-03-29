
// import Route from '@ember/routing/route';

// export default Route.extend({
// });

import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    category: {
      replace: true
    }
  }
});
