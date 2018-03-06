import Ember from 'ember';

export default Ember.Component.extend({
    dashboardService: Ember.inject.service("dashboard-service"),

    init() {
        this._super(...arguments);
        return this.get('dashboardService').getLeaderBoard(this.loggedinUser)
            .then(results => { this.set('leaderboarddata', results); })
            .then(() => {

                let labels = [];
                let tangiblecolors = [];
                let totalcolors = [];
                let intangiblecolors = [];
                let totaltimedataset = [];
                let totalintagibledataset = [];
                let totaltangibletimedataset = [];


                let dataset = this.get('leaderboarddata');

                dataset.forEach(element => {

                    let name = element.name;
                    let tangibletime = parseFloat(element.totaltangibletime_hrs).toFixed(2);
                    let intangibletime = parseFloat(element.totalintangibletime_hrs).toFixed(2);
                    let totaltime = parseFloat(element.totaltime_hrs).toFixed(2);
                    let weeklycommited = parseFloat(element.weeklyComittedHours).toFixed(2);


                    let color = "";

                    if (tangibletime >= 0 && tangibletime <= 4.9999) {
                        color = "red"

                    }
                    else if (tangibletime >= 5 && tangibletime <= 9.9999) {
                        color = "orange"

                    }
                    else if (tangibletime >= 10 && tangibletime <= 19.9999) {
                        color = "green"

                    }
                    else if (tangibletime >= 20 && tangibletime <= 29.9999) {
                        color = "blue"

                    }
                    else if (tangibletime >= 30 && tangibletime <= 39.9999) {
                        color = "indigo"

                    }
                    else if (tangibletime >= 40 && tangibletime <= 49.9999) {
                        color = "violet"

                    }
                    else {
                        color = "purple"
                    }

                    labels.push(name);
                    totaltimedataset.push(totaltime),
                        totalcolors.push("grey");

                    totalintagibledataset.push(intangibletime);
                    intangiblecolors.push("yellow")


                    totaltangibletimedataset.push(tangibletime);
                    tangiblecolors.push(color);
                });




                let result = {
                    labels: labels,


                    datasets: [
                        { data: totaltangibletimedataset, backgroundColor: tangiblecolors },
                        { data: totalintagibledataset, backgroundColor: intangiblecolors },
                        { data: totaltimedataset, backgroundColor: totalcolors },


                    ]

                }
                this.set('leaderboard', result)

            })



    },


    ChartOptions: {
        tooltips: {
            enabled: true
        },
        hover: {
            animationDuration: 0
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,

                },

                scaleLabel: {
                    display: true
                },
                gridLines: {
                },
                stacked: true
            }],
            yAxes: [{

                stacked: true,
                maxBarThickness: 20
            }]
        },
        legend: {
            display: true
        },


    }



});
