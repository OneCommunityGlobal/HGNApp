import Route from '@ember/routing/route';
import moment from 'moment';
import {
    hash
} from 'rsvp';
import {
    set
} from '@ember/object';
import {
    inject
} from '@ember/service';

export default Route.extend({
    queryParams: {
        person_id: {
            refreshModel: true
        },
        personName: {
            refreshModel: true
        },
        project_id: {
            refreshModel: true
        },
        projectName: {
            refreshModel: true
        },
        FromDate: {
            refreshModel: true
        },
        ToDate: {
            refreshModel: true
        },
        week: {
            refreshModel: true
        }

    },
    projectService: inject('project-service'),
    userProfileService: inject('user-profile-service'),
    timeEntryService: inject('time-entry-service'),


    model(params) {
        let formattedDates = {
            'FromDate': moment(params.FromDate, 'X').format('MM/DD/YYYY'),
            "ToDate": moment(params.ToDate, 'X').format('MM/DD/YYYY')
        }
        let PWToDate = moment(params.FromDate, 'X').clone().subtract(1, "days").format('X');
        let PWFromDate = moment(PWToDate, 'X').clone().subtract(6, "days").format('X');
        if (params.project_id != null) {
            return hash({
                projects: this.get('projectService').getAllProjects(),
                persons: this.get('userProfileService').getAllUserProfiles(),
                projectmembers: this.get('userProfileService').getAllProjectMembers(params.project_id),
                timeentrydata: this.get('timeEntryService').getTimeEntriesForProject(params.project_id, params.FromDate, params.ToDate),
                previoustimeentrydata: this.get('timeEntryService').getTimeEntriesForProject(params.project_id, PWFromDate, PWToDate),
                dates: formattedDates,

            });
        } else {
            return hash({
                projects: null,
                projectmembers: this.get('projectService').getUserProjects(params.person_id),
                timeentrydata: this.get('timeEntryService').getTimeEntriesForPeriod(params.person_id, moment(params.FromDate, 'X').format("YYYY-MM-DD"), moment(params.ToDate, 'X').format("YYYY-MM-DD")),
                persons: this.get('userProfileService').getAllUserProfiles(),
                previoustimeentrydata: this.get('timeEntryService').getTimeEntriesForPeriod(params.person_id, moment(PWFromDate, 'X').format("YYYY-MM-DD"), moment(PWToDate, 'X').format("YYYY-MM-DD")),
                dates: formattedDates
            });
        }
    },

    setupController(controller, model) {
        this._super(...arguments);
        set(controller, 'teams', model.teams);
        set(controller, 'projects', model.projects);
        set(controller, 'persons', model.persons);
        set(controller, 'projectmembers', model.projectmembers);
        set(controller, 'timeentrydata', model.timeentrydata);
        set(controller, 'previoustimeentrydata', model.previoustimeentrydata);
        set(controller, 'dates', model.dates);
        set(controller, 'weeks', this.controllerFor('reports').get('noofWeeks'));
    },

});
