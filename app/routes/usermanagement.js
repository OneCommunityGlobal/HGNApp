
import { inject } from '@ember/service';
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(UnAuthenticatedRouteMixin, {
    userProfileService: inject('user-profile-service'),
    model() {
        return this.get('userProfileService').getAllUserProfiles();
    }

});
