import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
  dataService: inject('datastore-service'),
  model(params) {

    return this.get('dataService').getTeamById(params.team_id);
  }
});
