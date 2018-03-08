import Ember from 'ember';

export default Ember.Component.extend({

    dashboardService: Ember.inject.service('dashboard-service'),
    init() {
        this._super(...arguments);
        let forUserId = { requestorId: this.get('forUserId') }
        return this.get('dashboardService').getMonthlyEffort(forUserId)
            .then(result => { this.set('laborthismonth', result); })
            .then(() => {

                let monthlydata = this.get('laborthismonth');
                let labels = [];
                let data = [];
                let backgroundColor = [];

                monthlydata.forEach(element => {

                    labels.push(element.projectName);
                    data.push(parseFloat(element.timeSpent_hrs).toFixed(2));

                    // backgroundColor.push(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`)

                    backgroundColor.push("white")


                });

                let results = {
                    labels: labels,
                    datasets: [{
                        label: "Effort Spent",
                        data: data,
                        borderWidth: 1,
                        backgroundColor: backgroundColor
                    }]
                }

                this.set('hoursthismonth', results)

            })
    },

    baroptions:
        {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            },
            legend: {
                display: true,
                usePointStyle: true,
                position: "bottom",
                labels: {

                }
            }

        },
});