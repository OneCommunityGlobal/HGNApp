import Component from '@ember/component';
import moment from 'moment';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { set } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({
    tagName: "",
    timeEntryService: inject('time-entry-service'),
    projectService: inject("project-service"),
    init() {

        this._super(...arguments);
        this.set("timelogs", []);
        this.set("projects", []);
        this.set("projectfiltervalue", "");
        this.set("options", {
            plugins: ["autolink", "link"],
            menubar: false,
            toolbar: ["cut copy paste link numlist bullist outdent indent"],
            browser_spellcheck: true,
        });
    },

    isUserAdministrator: computed("", "loggedinUser", function () {
        let loggedinUserRole = this.get('loggedinUser.role');
        return (loggedinUserRole === "Administrator");
    }),



    isEditable: computed("forUserId", "loggedinUser", function () {
        let foruser = this.get('forUserId');
        let loggedinUserId = this.get('loggedinUser.requestorId');
        let loggedinUserRole = this.get('loggedinUser.role');
        return (loggedinUserRole === "Administrator" || foruser === loggedinUserId);


    }),
    didReceiveAttrs() {
        this._super(...arguments);
        let foruser = this.get('forUserId');
        this.get('projectService').getUserProjects(foruser)
            .then(results => {
                this.set('projects', results);
            });
        this.getDataforTime();
        this.set("lastUpdatedDateime", Date.now())

    },

    didUpdateAttrs() {
        this.getDataforTime();
    },

    projectfilterlist: computed("projects.@each", "timelogs.@each", function () {

        let allprojects = new Map();

        let timelogs = this.get("timelogs");
        let projects = this.get("projects");

        timelogs.forEach(element => {
            let project = { projectId: element.projectId, projectName: element.projectName };
            allprojects.set(project.projectId, project);
        });

        projects.forEach(element => {
            let project = { projectId: element.projectId, projectName: element.projectName };
            allprojects.set(project.projectId, project);
        })


        return allprojects;

    }),

    timelogsview: computed("timelogs.@each", "projectfiltervalue", function () {

        let timelogs = this.get("timelogs");
        let projectfiltervalue = this.get("projectfiltervalue");
        let tangibletime = 0;
        let intangibletime = 0;
        let total = 0;
        let records = [];


        timelogs.forEach(element => {
            if (projectfiltervalue == "" || projectfiltervalue == element.projectId) {
                records.push(element);
                let timeSpent = element.hours + ":" + element.minutes;
                let totalSeconds = moment.duration(timeSpent).asSeconds();
                total += totalSeconds;
                element.isTangible ? (tangibletime += totalSeconds) : (intangibletime += totalSeconds)
            }

        })

        return {
            "records": records,
            "tangibletime": parseFloat(tangibletime / 3600).toFixed(2),
            "intangibletime": parseFloat(intangibletime / 3600).toFixed(2),
            "totaltime": parseFloat(total / 3600).toFixed(2)
        }
    }),



    getDataforTime() {

        let period = this.get("period");
        let userid = this.get('forUserId');
        let fromdate;
        let todate;


        let start = this.get('fromDate') ? moment(this.get('fromDate')) : moment().startOf('isoWeek');
        let end = this.get('toDate') ? moment(this.get('toDate')) : moment().startOf('isoWeek').endOf("isoWeek");

        fromdate = start.clone().startOf("day").format();
        todate = end.clone().endOf("day").format();

        let startdate = start.clone().format("MM/DD/YYYY");

        let enddate = end.clone().format("MM/DD/YYYY");

        this.set("perioddates", ` ${startdate} to ${enddate}`);

        this.get('timeEntryService').getTimeEntriesForPeriod(userid, fromdate, todate)
            .then(results => {
                this.set('timelogs', results);
            });
    },

    actions: {

        saveEditsToTimelog(timelog) {

            let toastr = this.get("toast");

            this.get('timeEntryService').updateTimeEntry(timelog._id, timelog).then(
                () => {
                    toastr.success("Edits Successfully saved");
                    this.set('isFormSubmitted', "");
                    this.get("notifyController")(Date.now());
                },
                error => { toastr.error("", error); })

        },

        deleteTimelog(timelog) {
            if (confirm("Are you sure you want to delete this entry")) {
                let toastr = this.get('toast');
                this.get('timeEntryService').deleteTimeEntry(timelog._id)
                    .then(() => {

                        this.get('timelogs').removeObject(timelog);
                        toastr.success("Time Entry Succesfully Removed");
                        this.get("notifyController")(Date.now())
                    },
                        error => { toastr.error("", error); }
                    )
            }
        }
    }


});
