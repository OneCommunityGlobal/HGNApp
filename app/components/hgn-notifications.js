
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';


export default Component.extend({


    didReceiveAttrs() {
        this._super(...arguments);
        this.getNotifications();
        this.run()
    },


    run: function () {
        var interval = 1000 * 60;
        Ember.run.later(this, function () {
            this.set("lastUpdatedDateime", Date.now())
            this.getNotifications();
            this.run();
        }, interval);

    },

    nummotifications: computed("notifications.[]", function () {
        let notifications = this.get("notifications");
        let numnotifications = notifications.length;
        return numnotifications;
    }),

    getNotifications: function () {
        let forUserId = this.get('forUserId');
        this.get('DataService').getUnreadNotifications(forUserId)
            .then(results => {
                this.set('notifications', results);
                this.get("notifyController")(results.length);
            });

    },

    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('forUserId');
        return (loggedinUser === forUserId);

    }),

    actions: {
        deleteNotification(notification) {

            this.get('notifications').removeObject(notification);
            this.get('DataService').deleteNotification(notification._id);
            alert('deleted');

        },


    }
});
