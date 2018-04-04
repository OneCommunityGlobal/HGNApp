
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
        this.get('loginService').getLoggedinUser()
            .then(results => {
                this.set("userrole", results.role);
                this.set("userId", results.requestorId);

                this.get('dataService').getUnreadNotifications(results.requestorId)
                    .then(notifications => {
                        this.set('notificationslength', notifications.length);
                    });

                this.get('dashboardService').getDashboardData(results.requestorId)
                    .then(databoarddata => {
                        this.set("userDashboardData", databoarddata)
                    });

            });



    },

    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        return userrole === "Administrator" ? true : false;
    }),
    isUserReportAdmin: computed('userrole', function () {
        let userrole = this.get('userrole');
        return userrole === "Manager" ? true : userrole === "Administrator" ? true : userrole === "Core Team" ? true : false;
    }),


    actions: {

        logout() {
            this.get('loginService').logout();

        }





    }

});
