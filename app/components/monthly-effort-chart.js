
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
        this.set("lastUpdatedDateime", Date.now())
        this.run();
    },

    run: function () {
        var interval = 1000 * 60;
        Ember.run.later(this, function () {
            this.set("lastUpdatedDateime", Date.now())
            this.updateMonthlyData();
            this.run();
        }, interval);

    },

    updateMonthlyData: function () {
        let forUserId = { requestorId: this.get('forUserId') }
        return this.get('dashboardService').getMonthlyEffort(forUserId)
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

    whenUpdated: computed('lastUpdatedDateime', 'Datetime.now()', function () {
        var now = moment().format("MM/DD/YYYY hh:mm:ss A");
        // var lastUpdatedDateime = moment(this.get('lastUpdatedDateime'));
        // var duration = moment.duration(now.diff(lastUpdatedDateime)).humanize();
        return now;

    }),
});
