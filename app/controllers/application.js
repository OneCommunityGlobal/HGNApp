import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({


  isHeaderVisible: computed('currentRouteName', function () {

    this.set('hideHeaderRoutes', ['login','forgotpassword']);
    return this.get('hideHeaderRoutes').indexOf(this.get('currentRouteName')) === -1;
  }),

  actions:
    {
      navigatetoProfile(userId) {
        this.transitionToRoute(`/profile/${userId}`);
      }

    }
});
