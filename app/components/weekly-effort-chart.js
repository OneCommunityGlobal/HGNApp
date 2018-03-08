import Ember from 'ember';

export default Ember.Component.extend({

    dashboardService: Ember.inject.service('dashboard-service'),
    init() {
        this._super(...arguments);
        let forUserId = { requestorId: this.get('forUserId') }
        return this.get('dashboardService').getWeeklyEffort(forUserId)
            .then(result => { this.set('laborthisweek', result); })
            .then(() => {
                let actual = this.get('laborthisweek');
                let actualhours = parseFloat(actual[0].timeSpent_hrs).toFixed(2);
                let committedhours = parseFloat(actual[0].weeklyComittedHours).toFixed(2);


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


    pieChartOptions:
        {
            legend: {
                display: true,
                usePointStyle: true,
                position: "bottom",
                labels: {

                }
            }

        },
});
