
import EmberObject, { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

    showMyModal: false,
    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('model.forUserId');
        return (loggedinUser === forUserId);

    }),


});
