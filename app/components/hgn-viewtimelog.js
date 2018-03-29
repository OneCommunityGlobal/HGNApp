import Component from '@ember/component';
import moment from 'moment';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({

    timeEntryService: inject('time-entry-service'),
    fromDate: Date.now(),
    todate: Date.now(),

    init() {

        this._super(...arguments);
        let foruser = this.get('forUserId');
        this.get('timeEntryService').getUserProjects(foruser)
            .then(results => {
                this.set('projects', results);
            });


    },
    isEditable: computed("forUserId", "loggedinUser", function () {
        let foruser = this.get('forUserId');
        let loggedinUserId = this.get('loggedinUser.requestorId');
        let loggedinUserRole = this.get('loggedinUser.role');
        return (loggedinUserRole === "Administrator" || foruser === loggedinUserId);

    }),
    editableoptions: {
        plugins: ["link", "autolink"],
        menubar: "insert",
        toolbar: ""
    },

    noneditableoptions: {
        plugins: ["link", "autolink"],
        menubar: "insert",
        toolbar: "",
        readonly: 1
    },

    didReceiveAttrs() {



        this.getDataforTime();


    },

    didUpdateAttrs() {
        this.getDataforTime();
    },

    timelogsview: computed("timelogs.@each", function () {

        return this.get("timelogs");
    }),

    getDataforTime() {



        let period = this.get("period");
        let userid = this.get('forUserId');
        let fromdate;
        let todate;

        if (period === "currentWeek") {

            let start = moment().startOf("week");

            fromdate = start.clone().format('X');
            todate = start.clone().add(7, 'days').format('X');

            let startdate = start.clone().format("MM/DD/YYYY");
            let enddate = start.clone().add(1, 'week').format("MM/DD/YYYY");;

            this.set("period", `current week [ ${startdate} to ${enddate}]`);
        }

        else if (period === "custom") {
            let start = moment(this.get('fromDate'));
            let end = moment(this.get('toDate'))

            fromdate = start.clone().format('X');
            todate = end.clone().format('X');

            let startdate = start.clone().format("MM/DD/YYYY");

            let enddate = end.clone().format("MM/DD/YYYY");

            this.set("period", `custom range [ ${startdate} to ${enddate}]`);

        }

        this.get('timeEntryService').getTimeEntriesForPeriod(userid, fromdate, todate)
            .then(results => { this.set('timelogs', results) });
    },

    actions: {

        saveEditsToTimelog(timelog, index) {

            let toastr = this.get("ToastorService");

            let updatedvalues = {};

            updatedvalues.notes = timelog.notes;
            updatedvalues.timeSpent = timelog.hours.trim() + ":" + timelog.minutes.trim();
            updatedvalues.isTangible = timelog.isTangible;

            let taskvalue = timelog.taskId;
            if (taskvalue.includes("projectId")) //implying task and or project was updated
            {
                let valuesarray = taskvalue.split(",");

                let projectId = ((valuesarray[0].split(":"))[1]).trim();
                let taskId = ((valuesarray[1].split(":"))[1]).trim();


                updatedvalues.projectId = projectId;
                updatedvalues.taskId = taskId;
            }
            else {
                updatedvalues.projectId = timelog.projectId;
                updatedvalues.taskId = timelog.taskId;

            }
            this.get('timeEntryService').updateTimeEntry(timelog._id, updatedvalues).then(
                results => {
                    var updatedtimelog = this.get("timelogs").objectAt(index);

                    Ember.set(updatedtimelog, "notes", timelog.notes);
                    Ember.set(updatedtimelog, "projectId", updatedvalues.projectId);
                    Ember.set(updatedtimelog, "taskId", updatedvalues.taskId);
                    Ember.set(updatedtimelog, "isTangible", timelog.isTangible);
                    Ember.set(updatedtimelog, "hours", timelog.hours.trim());
                    Ember.set(updatedtimelog, "minutes", timelog.minutes.trim());
                    toastr.success("Edits Successfully saved");
                },
                error => { toastr.error("", error); })
        },

        deleteTimelog(timelog) {
            if (confirm("Are you sure you want to delete this entry")) {
                let toastr = this.get('ToastorService');
                this.get('timeEntryService').deleteTimeEntry(timelog._id)
                    .then(results => {
                        console.log(results);
                        this.get('timelogs').removeObject(timelog);
                        toastr.success("Time Entry Succesfully Removed")
                    },
                        error => { toastr.error("", error); }
                    )
            }
        }
    }


});
