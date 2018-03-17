import Component from '@ember/component';
import moment from 'moment';
import { inject } from '@ember/service';

export default Component.extend({

    timeEntryService: inject('time-entry-service'),

    init() {

        this._super(...arguments);
        $(document).ready(function () {

            $.noConflict();
            $('#tbltimelog').DataTable();
        });

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
            let enddate = start.clone().add(7, 'days').format("MM/DD/YYYY");;

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
    }

});
