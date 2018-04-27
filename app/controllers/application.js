
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({


  isHeaderVisible: computed('currentRouteName', function () {

    this.set('hideHeaderRoutes', ['login']);
    return this.get('hideHeaderRoutes').indexOf(this.get('currentRouteName')) === -1;
  }),

  actions:
    {
      navigatetoProfile(userId) {
        this.transitionToRoute(`/profile/${userId}`);

      }





    }
});
