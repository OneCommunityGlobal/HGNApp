
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';


export default Controller.extend({

    showMyModal: false,
    refresh: false,

    init() {
        this._super(...arguments);
        this.set("lastUpdatedDatetime", moment().format("MM/DD/YYYY hh:mm:ss A"));
        this.run();
    },

    forweek: computed("", function () {
        let thisweek = moment().startOf("week");
        let fromDate = moment().startOf("week").subtract(2, 'weeks');
        let toDate = moment().startOf("week").add(6, "days");

        return (
            {
                "fromDate": fromDate,
                "toDate": toDate
            }
        );
    }),

    run: function () {
        var interval = 1000 * 10;
        Ember.run.later(this, function () {
            this.set("lastUpdatedDatetime", moment().format("MM/DD/YYYY hh:mm:ss A"));
            this.run();
        }, interval);

    },

    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("userId");
        let forUserId = this.get('model.forUserId');
        let userrrole = this.get("userrole");
        return (loggedinUser === forUserId || userrrole === "Administrator");

    }),


});
