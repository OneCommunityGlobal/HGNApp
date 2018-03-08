import Ember from 'ember';

export default Ember.Controller.extend({
    isUserAdministrator: Ember.computed('userrole', function () {
        let userrole = this.get('userrole');
        //return userrole === "Administrator" ? true : false;

        return true;
    }),

});
