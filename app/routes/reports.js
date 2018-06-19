import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';
import {
    set
} from '@ember/object';
import {
    inject
} from '@ember/service';

export default Route.extend(UnAuthenticatedRouteMixin, {
    userProfileService: inject('user-profile-service'),
    projectService: inject('project-service'),
    teamService: inject('team-service'),
    model() {
        return Ember.RSVP.hash({
            projects: this.get('projectService').getAllProjects(),
            persons: this.get('userProfileService').getAllUserProfiles(),
            teams: this.get('teamService').getAllTeams()
        });
    },

    setupController(controller, model) {
        this._super(...arguments);
        set(controller, 'projects', model.projects);
        set(controller, 'persons', model.persons);
        set(controller, 'teams', model.teams);
    },
});
