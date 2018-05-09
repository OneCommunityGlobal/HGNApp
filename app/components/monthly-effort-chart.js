
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
    classNames: ["card", "text-center", "mb-3", "w-33", "h-100", "hgn-monthlyeffortchart", "prescrollable"],
    tagName: "card",

    dashboardService: inject('dashboard-service'),
    didReceiveAttrs() {
        this._super(...arguments);
        this.updateMonthlyData();
        this.run();
    },

    run: function () {
        var interval = 1000 * 60;
        Ember.run.later(this, function () {
            this.updateMonthlyData();
            this.run();
        }, interval);

    },

    updateMonthlyData: function () {
        let forUserId = { requestorId: this.get('forUserId') }
        let startdate = moment().startOf("month").format();
        let enddate = moment().endOf("month").format();
        return this.get('dashboardService').getMonthlyEffort(forUserId, startdate, enddate)
            .then(result => { this.set('laborthismonth', result); })
            .then(() => {

                let monthlydata = this.get('laborthismonth');
                let maxeffort = 0;
                let data = [];

                monthlydata.forEach(element => {
                    let effort = element.timeSpent_hrs;
                    maxeffort = (maxeffort > effort) ? maxeffort : effort;
                });

                monthlydata.forEach(element => {


                    data.push(
                        {
                            projectName: element.projectName,
                            effort: parseFloat(element.timeSpent_hrs).toFixed(2),
                            percentageeffort: (element.timeSpent_hrs * 100) / maxeffort
                        }

                    );
                });
                this.set("maxeffort", maxeffort);
                this.set("resultset", data)



            })
    },

});
