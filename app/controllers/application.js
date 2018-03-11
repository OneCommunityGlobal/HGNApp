
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({

  dataService: inject("datastore-service"),
  hideHeaderRoutes: ['index', 'login'],
  isHeaderVisible: computed('currentRouteName', function () {
    return this.get('hideHeaderRoutes').indexOf(this.get('currentRouteName')) === -1;
  }),

  isUserAdministrator: computed('userrole', function () {
    let userrole = this.get('userrole');
    return userrole === "Administrator" ? true : false;
  }),

  // notifications: Ember.computed('loggedinUser', function(){
  //   this.get('dataService').getUnreadNotifications(this.get('loggedinUser'))
  //       .then(results => { this.set('notifications', results);

  // })}),

  actions: {



  }


}
);
