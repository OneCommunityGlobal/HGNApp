import Controller from '@ember/controller';

export default Controller.extend({

    // userProfile: {},

    actions: {

        MyProfile() {

            this.transitionToRoute('myprofile');
        }

    }

});
