import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';


export default Route.extend(UnAuthenticatedRouteMixin, {
  model(params) {

    let forUserId = params.userId;
    return { "forUserId": forUserId };

  },




});


