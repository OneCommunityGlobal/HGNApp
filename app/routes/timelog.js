import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default Route.extend(UnAuthenticatedRouteMixin, {
  userProfileService: inject('user-profile-service'),
  model(params) {


    let forUserId = params.user_id;
    return this.get('userProfileService').getUserName(forUserId)
      .then((results) => {

        let result = {
          "name": results.name,
          "forUserId": forUserId
        }

        return result;

      })


  },




});


