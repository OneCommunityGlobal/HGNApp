
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(UnAuthenticatedRouteMixin, {

  // redirect: function() {
  //   this.transitionTo('login');
  // }

});
