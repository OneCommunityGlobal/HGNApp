
import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
    teamService: inject('team-service'),
    userProfileService: inject('user-profile-service'),
    model: function () {

        return Ember.RSVP.hash({
            allTeams: this.get('teamService').getAllTeams(),
            allUsers: (this.loggedinUser.role == "Administrator") ? this.get('userProfileService').getAllUserProfiles() : []
        });


    }
});
