
import { inject } from '@ember/service';
import Component from '@ember/component';
export default Component.extend({
    classNames: ["card", "text-center", "mb-3", "w-33", "h-100", "hgn-weeklyeffortchart", "prescrollable"],
    tagName: "card",

    dashboardService: inject('dashboard-service'),
    didReceiveAttrs() {
        this._super(...arguments);
        let pieChartOptions =
            {
                legend: {
                    display: true,
                    usePointStyle: true,
                    position: "bottom",
                    labels: {

                    }
                }

            }
        this.set('pieChartOptions', pieChartOptions);
        let forUserId = { requestorId: this.get('forUserId') }
        return this.get('dashboardService').getWeeklyEffort(forUserId)
            .then(result => { this.set('laborthisweek', result); })
            .then(() => {
                let actual = this.get('laborthisweek');
                let actualhours = parseFloat(actual[0].timeSpent_hrs).toFixed(2);
                let committedhours = parseFloat(actual[0].weeklyComittedHours).toFixed(2);

                this.set('actualhours', parseInt(actualhours));
                this.set("committedhours", parseInt(committedhours))


                let result = {
                    labels: ["Actual Effort", "Committed Effort"],

                    datasets: [{
                        data: [actualhours, committedhours],
                        backgroundColor: ["green", "white"]
                    }]

                }
                this.set('hoursthisweek', result)

            })

    },


});
