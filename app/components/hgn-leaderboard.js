
import { inject } from '@ember/service';
import Component from '@ember/component';
import $ from 'jquery';
import moment from 'moment';
import { computed } from '@ember/object';


export default Component.extend({
    dashboardService: inject("dashboard-service"),
    tagName: "card",
    classNames: ["card", "text-center", "mb-3", "w-33", "h-100", "prescrollable", "hgn-leaderboard"],
    called_at: "",

    init() {
        this._super(...arguments);
        this.getLeaderboardData();

    },

    didUpdateAttrs() {
        this._super(...arguments);
        this.getLeaderboardData();
    },


    getLeaderboardData: function () {

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

    didRender() {
        this._super(...arguments);
        this.scrollToRow();
    },

    scrollToRow() {
        let row = $("tr.table-active").get()[0];

        if (row) { row.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" }); }

    }



});
