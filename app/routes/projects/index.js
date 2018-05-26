
import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import UnAuthenticatedRouteMixin from '../../mixins/un-authenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
    projectService: inject('project-service'),
    userProfileService: inject('user-profile-service'),
    model: function () {

        return Ember.RSVP.hash({
            allProjects: this.get('projectService').getAllProjects(),
            allUsers: (this.loggedinUser.role == "Administrator") ? this.get('userProfileService').getAllUserProfiles() : []
        });


    }
});
