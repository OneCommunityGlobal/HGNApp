import Ember from 'ember';
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';

export default Ember.Route.extend(UnAuthenticatedRouteMixin, {
    userProfileService: Ember.inject.service('user-profile-service'),
    model(params) {
        let requestor = { requestorId: params.userId }
        return this.get('userProfileService').getUserProfileData(requestor);
    }
});
