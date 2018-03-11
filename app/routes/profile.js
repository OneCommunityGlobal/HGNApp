
import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
    userProfileService: inject('user-profile-service'),
    model(params) {
        let requestor = { requestorId: params.userId }
        return this.get('userProfileService').getUserProfileData(requestor);
    }
});
