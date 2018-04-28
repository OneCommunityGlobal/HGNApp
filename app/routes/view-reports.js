import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  teamService: inject('datastore-service'),
  projectService: inject('project-service'),
  userProfileService: inject('user-profile-service'),
  timeEntryService: inject('time-entry-service'),

  model(params) {
    let formatedDates = {'FromDate': moment(params.FromDate, 'X').format('DD/MM'), "ToDate": moment(params.ToDate, 'X').format('DD/MM')}
    let PWToDate = moment().clone().subtract(8, "days").format('X');
    let PWFromDate = moment().clone().subtract(14, "days").format('X');
  return Ember.RSVP.hash({
    teams: this.get('teamService').getAllTeams(),
    projects: this.get('projectService').getAllProjects(),
    persons: this.get('userProfileService').getAllUserProfiles(),
    projectmembers: this.get('userProfileService').getAllProjectMembers(params.project_id),
    timeentrydata: this.get('timeEntryService').getTimeEntriesForProject(params.project_id,params.FromDate,params.ToDate),
    previuostimeentrydata: this.get('timeEntryService').getTimeEntriesForProject(params.project_id, PWFromDate, PWToDate),
    dates: formatedDates,

  });
},

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'teams', model.teams);
    Ember.set(controller, 'projects', model.projects);
    Ember.set(controller, 'persons', model.persons);
    Ember.set(controller,'projectmembers', model.projectmembers);
    Ember.set(controller, 'timeentrydata', model.timeentrydata);
    Ember.set(controller, 'previuostimeentrydata', model.previuostimeentrydata);
    Ember.set(controller, 'dates', model.dates);
  },

});
