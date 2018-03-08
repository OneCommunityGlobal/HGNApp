import Ember from 'ember';

export default Ember.Component.extend({
    dashboardService: Ember.inject.service("dashboard-service"),


    init() {
        this._super(...arguments);
        return this.get('dashboardService').getLeaderBoard(this.loggedinUser)
            .then(results => { this.set('leaderboarddata', results); })
            .then(() => {

                let resultset = [];
                let dataset = this.get('leaderboarddata');
                let maxtotal = 0;


                dataset.forEach(element => {
                    let totaltime = parseFloat(parseFloat(element.totaltime_hrs).toFixed(2));
                    maxtotal = (totaltime > maxtotal) ? totaltime : maxtotal;
                });

                dataset.forEach(element => {

                    let name = element.name;
                    let tangibletime = parseFloat(parseFloat(element.totaltangibletime_hrs).toFixed(2));
                    let intangibletime = parseFloat(parseFloat(element.totalintangibletime_hrs).toFixed(2));
                    let totaltime = parseFloat(parseFloat(element.totaltime_hrs).toFixed(2));
                    let weeklycommited = parseFloat(parseFloat(element.weeklyComittedHours).toFixed(2));
                    let tangiblebarcolor = this.get('getcolor')(tangibletime);
                    let tangibletimewidth = parseInt(tangibletime * 100 / maxtotal);
                    let intangibletimewidth = parseInt(intangibletime * 100 / maxtotal);
                    let result =
                        {
                            didMeetWeeklyCommitment: (tangibletime >= weeklycommited) ? true : false,
                            name: name,
                            weeklycommited: weeklycommited,
                            personId: element.personId,
                            tangibletime: parseFloat(tangibletime).toFixed(2),
                            tangibletimewidth: tangibletimewidth,
                            intangibletimewidth: intangibletimewidth,
                            tangiblebarcolor: tangiblebarcolor,
                            intangibletime: parseFloat(intangibletime).toFixed(2),
                            totaltime: parseFloat(totaltime).toFixed(2)
                        }

                    resultset.pushObject(result)

                });
                this.set('maxtotaltime', maxtotal);
                this.set('resultset', resultset);
            })



    },

    getcolor: function (effort) {
        let color = "";

        if (effort >= 0 && effort <= 4.9999) {
            color = "red"

        }
        else if (effort >= 5 && effort <= 9.9999) {
            color = "orange"

        }
        else if (effort >= 10 && effort <= 19.9999) {
            color = "green"

        }
        else if (effort >= 20 && effort <= 29.9999) {
            color = "blue"

        }
        else if (effort >= 30 && effort <= 39.9999) {
            color = "indigo"

        }
        else if (effort >= 40 && effort <= 49.9999) {
            color = "violet"

        }
        else {
            color = "purple"
        }
        return color;

    },

    ChartOptions: {
        tooltips: {
            enabled: true
        },
        hover: {
            animationDuration: 0
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
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
                labelAngle: 50,
                stacked: true,
                maxBarThickness: 20,
                gridLines: {
                },
                stacked: true
            },

            ]
        },
        legend: {
            display: true
        },


    },

    didRender() {
        this._super(...arguments);
        Ember.run.scheduleOnce('afterRender', this, 'scrollToRow');
    },

    scrollToRow() {
        let row = Ember.$("tr.table-active").get()[0];

        row.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });

    }



});
