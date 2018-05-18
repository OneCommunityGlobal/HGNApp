import Route from '@ember/routing/route';
import moment from 'moment';
import {
    set
} from '@ember/object';
import {
    inject
} from '@ember/service';

export default Route.extend({
    projectService: inject('project-service'),
    userProfileService: inject('user-profile-service'),
    timeEntryService: inject('time-entry-service'),


    model(params) {
        let formattedDates = {
            'FromDate': moment(params.FromDate, 'X').format('MM/DD/YYYY'),
            "ToDate": moment(params.ToDate, 'X').format('MM/DD/YYYY')
        }
        let allprojects = this.get('projectService').getAllProjects();

        let PWToDate = moment(params.FromDate, 'X').clone().subtract(1, "days").format('X');
        let PWFromDate = moment(PWToDate, 'X').clone().subtract(6, "days").format('X');
        return Ember.RSVP.hash({
            projects: this.get('projectService').getAllProjects(),
            persons: this.get('userProfileService').getAllUserProfiles(),
            projectmembers: this.get('userProfileService').getAllProjectMembers(params.project_id),
            timeentrydata: this.get('timeEntryService').getTimeEntriesForProject(params.project_id, params.FromDate, params.ToDate),
            previuostimeentrydata: this.get('timeEntryService').getTimeEntriesForProject(params.project_id, PWFromDate, PWToDate),
            dates: formattedDates,

        });
    },



    setupController(controller, model) {
        this._super(...arguments);
        set(controller, 'teams', model.teams);
        set(controller, 'projects', model.projects);
        set(controller, 'persons', model.persons);
        set(controller, 'projectmembers', model.projectmembers);
        set(controller, 'timeentrydata', model.timeentrydata);
        set(controller, 'previuostimeentrydata', model.previuostimeentrydata);
        set(controller, 'dates', model.dates);
        set(controller, 'weeks', this.controllerFor('reports').get('noofWeeks'));
    },

});
