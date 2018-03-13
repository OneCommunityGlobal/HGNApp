
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({

    dashboardService: inject('dashboard-service'),
    init() {
        this._super(...arguments);
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
    }
});
