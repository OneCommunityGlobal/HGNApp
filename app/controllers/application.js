
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({

  dataService: inject("datastore-service"),

  isHeaderVisible: computed('currentRouteName', function () {

    this.set('hideHeaderRoutes', ['login']);
    return this.get('hideHeaderRoutes').indexOf(this.get('currentRouteName')) === -1;
  }),

  isUserAdministrator: computed('userrole', function () {
    let userrole = this.get('userrole');
    return userrole === "Administrator" ? true : false;
  }),

  notificationslength: Ember.computed('userId', function () {
    this.get('dataService').getUnreadNotifications(this.get('userId'))
      .then(results => {
        this.set('notificationslength', results.length);

      })
  }),

}
);
