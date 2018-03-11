import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';

export default Ember.Controller.extend({

    showMyModal: false,
    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('model.forUserId');
        return (loggedinUser === forUserId);

    }),


});
