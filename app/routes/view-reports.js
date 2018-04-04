import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  teamService: inject('datastore-service'),
  projectService: inject('project-service'),
  userProfileService: inject('user-profile-service'),
  model() {
  return Ember.RSVP.hash({
    teams: this.get('teamService').getAllTeams(),
    projects: this.get('projectService').getAllProjects(),
    persons: this.get('userProfileService').getAllUserProfiles()
  });
},
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'teams', model.teams);
    Ember.set(controller, 'projects', model.projects);
    Ember.set(controller, 'persons', model.persons);
  },

});
