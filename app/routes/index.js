
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend(UnAuthenticatedRouteMixin, {

  dashboardService: inject('dashboard-service'),

  model() {
    return this.get('dashboardService').getDashboardData(this.loggedinUser);
  },


});
