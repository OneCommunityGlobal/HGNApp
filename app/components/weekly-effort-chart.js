
import { inject } from '@ember/service';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ["w-100", "h-100", "prescrollable", "text-center"],
    tagName: "card",

    dashboardService: inject('dashboard-service'),
    didReceiveAttrs() {
        this._super(...arguments);
        let self = this;
        let userId = this.get('forUserId')
        let forUserId = { requestorId: userId }
        this.get('dashboardService').getWeeklyEffort(forUserId)
            .then(result => { this.set('laborthisweek', result); })
            .then(() => {
                let actual = this.get('laborthisweek');
                let actualhours = parseFloat(actual[0].timeSpent_hrs).toFixed(2);
                let committedhours = parseFloat(actual[0].weeklyComittedHours).toFixed(2);
                let percentdelivered = parseFloat(actualhours * 100 / committedhours).toFixed(2);

                if (percentdelivered < 30) {
                    this.set("color", "red");

                }
                else if (percentdelivered > 30 && percentdelivered < 90) {
                    this.set("color", "orange");

                }
                else if (percentdelivered > 90) {
                    this.set("color", "green");

                }
                this.set('actualhours', parseInt(actualhours));
                this.set("committedhours", parseInt(committedhours));


                this.set("percentdelivered", parseInt(percentdelivered));
            })
            .then(() => {

                // google.charts.load('current', { 'packages': ['gauge'] });
                // google.charts.setOnLoadCallback(function () {
                //     let percentdelivered = self.get("percentdelivered");
                //     let elementid = self.get('elementid');
                //     self.updateWeeklyData(percentdelivered, elementid);
                // });
            })


    },



    run: function () {
        var interval = 1000 * 60;
        Ember.run.later(this, function () {
            this.updateWeeklyData();
            this.run();
        }, interval);
    },

    updateWeeklyData: function (percentdelivered, elementid) {

        var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['', percentdelivered]

        ]);
        var options = {
            width: 180, height: 75,
            redFrom: 0, redTo: 30,
            yellowFrom: 31, yellowTo: 90,
            greenFrom: 91, greenTo: 100,
            min: 0, max: 100
        };
        var chart = new google.visualization.Gauge(document.getElementById(elementid));

        chart.draw(data, options);

    }



});
