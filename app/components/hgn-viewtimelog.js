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
                console.log(results);
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

        saveEditsToTimelog(timelog) {

        },

        deleteTimelog(timelog) {

        }
    }


});
