
import { inject } from '@ember/service';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ["w-100", "h-100", "text-center"],
    actualhours: computed("tangiblelaborthisweek", function () {
        return parseFloat(this.get("tangiblelaborthisweek")).toFixed(2);
    }),

    committedhours: computed("weeklyCommitted", function () {
        return parseFloat(this.get("weeklyCommitted"));
    }),
    percentdelivered: computed("tangiblelaborthisweek", "committedhours", function () {
        let actualhours = parseFloat(this.get('tangiblelaborthisweek')).toFixed(2);
        let committedhours = parseFloat(this.get("weeklyCommitted")).toFixed(2);
        return parseFloat(actualhours * 100 / committedhours).toFixed(2);
    }),
    color: computed("tangiblelaborthisweek", "committedhours", function () {
        let actualhours = parseFloat(this.get('tangiblelaborthisweek')).toFixed(2);
        let committedhours = parseFloat(this.get("weeklyCommitted")).toFixed(2);
        let percentdelivered = parseFloat(actualhours * 100 / committedhours).toFixed(2);
        return (percentdelivered <= 30) ? "red" : (percentdelivered > 30 && percentdelivered <= 90) ? "orange" : "green";
    }),


    dashboardService: inject('dashboard-service'),
    didReceiveAttrs() {
        this._super(...arguments);
        let self = this;
        let userId = this.get('forUserId')
        let forUserId = { requestorId: userId }
        let startdate = moment().startOf("isoWeek").format();
        let enddate = moment().endOf("isoWeek").format();
        return this.get('dashboardService').getWeeklyEffort(forUserId, startdate, enddate)
            .then((result) => {
                this.set('tangiblelaborthisweek', result[0].timeSpent_hrs);
                this.set("weeklyCommitted", result[0].weeklyComittedHours);
            });

    },


});
