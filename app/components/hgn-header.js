
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({

    showNotifications: false,
    loginService: inject("login-service"),

    actions: {

        logout() {
            this.get('loginService').logout();

        }





    }

});
