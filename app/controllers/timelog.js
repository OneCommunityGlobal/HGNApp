
import { computed } from '@ember/object';
import Controller from '@ember/controller';


export default Controller.extend({

    showMyModal: false,
    refresh: false,

    init() {
        this._super(...arguments);
        this.set("refresh", true);
        this.run();


    },

    run: function () {
        var interval = 1000 * 10;
        Ember.run.later(this, function () {
            this.set("lastUpdatedDateime", Date.now())
            this.set("refresh", true);
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
