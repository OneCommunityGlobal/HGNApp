
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from "../config/environment"

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
                this.get('dashboardService').getDashboardData(results.requestorId)
                    .then(databoarddata => {
                        this.set("userDashboardData", databoarddata)
                    });

            });
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
