
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend(UnAuthenticatedRouteMixin, {

  dashboardService: inject('dashboard-service'),

  model() {
    return this.get('dashboardService').getDashboardData(this.loggedinUser);
  },

  // setupController: function(controller, model){

  //   let user = this.get('loggedinUser');
  //   controller.set('loggedinUser', this.loggedinUser);  
  //   controller.set('model', model)
  //    },

});
