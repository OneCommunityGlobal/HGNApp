import Component from '@ember/component';
import moment from 'moment';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { set } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({

    timeEntryService: inject('time-entry-service'),
    init() {
        this._super(...arguments);
        this.set('fromDate', Date.now());
        this.set('todate', Date.now());
        this.set("options", {
            plugins: ["autolink"],
            menubar: false,
            //statusbar: false,
            max_height: 200
        });
    },

    isEditable: computed("forUserId", "loggedinUser", function () {
        let foruser = this.get('forUserId');
        let loggedinUserId = this.get('loggedinUser.requestorId');
        let loggedinUserRole = this.get('loggedinUser.role');
        return (loggedinUserRole === "Administrator" || foruser === loggedinUserId);

    }),
    didReceiveAttrs() {
        this._super(...arguments);
        let foruser = this.get('forUserId');
        this.get('timeEntryService').getUserProjects(foruser)
            .then(results => {
                this.set('projects', results);
            });
        this.getDataforTime();
        this.set("lastUpdatedDateime", Date.now())
        this.run();
    },
    run: function () {
        var interval = 1000 * 600;
        later(this, function () {
            this.set("lastUpdatedDateime", Date.now())
            this.getDataforTime();
            this.run();
        }, interval);

    },
    whenUpdated: computed('lastUpdatedDateime', 'Datetime.now()', function () {
        var now = moment().format("MM/DD/YYYY hh:mm:ss A");
        // var lastUpdatedDateime = moment(this.get('lastUpdatedDateime'));
        // var duration = moment.duration(now.diff(lastUpdatedDateime)).humanize();
        return now;

    }),


    timelogsview: computed("timelogs.@each", function () {

        return this.get("timelogs");
    }),

    getDataforTime() {

        let period = this.get("period");
        let userid = this.get('forUserId');
        let fromdate;
        let todate;

        if (period === "custom") {
            let start = moment(this.get('fromDate'));
            let end = moment(this.get('toDate'))

            fromdate = start.clone().format('X');
            todate = end.clone().format('X');

            let startdate = start.clone().format("MM/DD/YYYY");

            let enddate = end.clone().format("MM/DD/YYYY");

            this.set("perioddates", `custom range [ ${startdate} to ${enddate}]`);

        }
        else {
            let start = moment().startOf("week");

            fromdate = start.clone().format('X');
            todate = start.clone().add(7, 'days').format('X');

            let startdate = start.clone().format("MM/DD/YYYY");
            let enddate = start.clone().add(1, 'week').format("MM/DD/YYYY");

            this.set("perioddates", `current week [ ${startdate} to ${enddate}]`);

        }

        this.get('timeEntryService').getTimeEntriesForPeriod(userid, fromdate, todate)
            .then(results => { this.set('timelogs', results) });
    },



    actions: {

        saveEditsToTimelog(timelog, index) {


            let toastr = this.get("toast");

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
                () => {
                    var updatedtimelog = this.get("timelogs").objectAt(index);

                    set(updatedtimelog, "notes", timelog.notes);
                    set(updatedtimelog, "projectId", updatedvalues.projectId);
                    set(updatedtimelog, "taskId", updatedvalues.taskId);
                    set(updatedtimelog, "isTangible", timelog.isTangible);
                    set(updatedtimelog, "hours", timelog.hours.trim());
                    set(updatedtimelog, "minutes", timelog.minutes.trim());
                    toastr.success("Edits Successfully saved");
                    this.set('isFormSubmitted', "");
                },
                error => { toastr.error("", error); })

        },

        deleteTimelog(timelog) {
            if (confirm("Are you sure you want to delete this entry")) {
                let toastr = this.get('toast');
                this.get('timeEntryService').deleteTimeEntry(timelog._id)
                    .then(() => {

                        this.get('timelogs').removeObject(timelog);
                        toastr.success("Time Entry Succesfully Removed")
                    },
                        error => { toastr.error("", error); }
                    )
            }
        }
    }


});
