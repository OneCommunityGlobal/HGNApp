
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    showNotifications: false,
    dashboardService: inject("dashboard-service"),
    dataService: inject("datastore-service"),
    loginService: inject("login-service"),

    init() {
        this._super(...arguments);
        return this.get('loginService').getLoggedinUser()
            .then(results => {
                this.set("userrole", results.role);
                this.set("userId", results.requestorId);
                this.getNotifications();
                this.run();
                this.get('dashboardService').getDashboardData(results.requestorId)
                    .then(databoarddata => {
                        this.set("userDashboardData", databoarddata)

                    });

            });
    },
    run: function () {
        var interval = 1000 * 60;
        Ember.run.later(this, function () {
            this.set("lastUpdatedDateime", Date.now())
            this.getNotifications();
            this.run();
        }, interval);

    },

    getNotifications: function () {
        this.get('dataService').getUnreadNotifications(this.get("userId"))
            .then(notifications => {
                this.set('notificationslength', notifications.length);
            });

    },

    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        return userrole === "Administrator" ? true : false;
    }),
    isUserReportAdmin: computed('userrole', function () {
        let userrole = this.get('userrole');
        return (userrole === "Manager" || userrole === "Administrator" || userrole === "Core Team")
    }),


    actions: {

        logout() {
            this.get('loginService').logout();

        },

        navigatetoProfile() {

            let userId = this.get("userId")

            this.get(`navigatetoProfile`)(userId);

        }

    }

});
