
import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        return userrole === "Administrator" ? true : false;
    }),

});
