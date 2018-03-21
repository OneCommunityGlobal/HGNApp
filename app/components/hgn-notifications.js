
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({


    init() {
        this._super(...arguments);

        let forUserId = this.get('forUserId');

        this.get('DataService').getUnreadNotifications(forUserId)
            .then(results => { this.set('notifications', results); });
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

        }
    }
});
