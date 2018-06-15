
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';
import { inject } from '@ember/service';


export default Controller.extend({

    showMyModal: false,
    refresh: false,
    clock: inject('hgn-clock'),

    init() {
        this._super(...arguments);
        this.set("lastUpdatedDatetime", moment().format("MM/DD/YYYY hh:mm:ss A"));
        //this.run();
    },
    loggedinUserTaskMinutes: computed('clock.minute', function () {
        return this.get('clock.minute');
    }),
    loggedinUserTaskHours: computed('clock.hour', function () {
        return this.get('clock.hour');
    }),

    forweek: computed("", function () {
        let fromDate_wk_2 = moment().startOf('isoWeek').subtract(2, 'weeks');
        let toDate_wk_2 = moment().subtract(2, "weeks").endOf("isoWeek");

        let fromDate_wk_1 = moment().startOf('isoWeek').subtract(1, 'weeks');
        let toDate_wk_1 = moment().subtract(1, "weeks").endOf("isoWeek");

        let fromDate_wk_0 = moment().startOf('isoWeek');
        let toDate_wk_0 = moment().endOf("isoWeek");


        return (
            {
                fromDate_wk_0: fromDate_wk_0,
                toDate_wk_0: toDate_wk_0,
                fromDate_wk_1: fromDate_wk_1,
                toDate_wk_1: toDate_wk_1,
                fromDate_wk_2: fromDate_wk_2,
                toDate_wk_2: toDate_wk_2
            }
        );
    }),


    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("userId");
        let forUserId = this.get('model.forUserId');
        let userrrole = this.get("userrole");
        return (loggedinUser === forUserId || userrrole === "Administrator");

    }),

    actions:
        {

        }


});
