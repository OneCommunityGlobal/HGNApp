import Ember from 'ember';

export default Ember.Controller.extend({

    showMyModal: false,
    isEditable: Ember.computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('model.forUserId');
        return (loggedinUser === forUserId);

    }),

    actions:
        {


        }
});
