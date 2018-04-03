
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

    showMyModal: false,

    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("userId");
        let forUserId = this.get('model.forUserId');
        let userrrole = this.get("userrole");
        return (loggedinUser === forUserId || userrrole === "Administrator");

    }),


});
