
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


    }



});
