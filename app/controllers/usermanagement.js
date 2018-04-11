
import { inject } from '@ember/service';
import Controller from '@ember/controller';
export default Controller.extend({
    selectedOption: null,
    userProfileService: inject('user-profile-service'),



    newUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        phoneNumber: "",
        weeklyCommittedHours: ""
    },

    actions: {
       

        activeFilter: function () {
           //alert("hi");
         // return this.get('userProfileService').getActiveUserProfiles();
        },

        saveNewUser: function () {
            let user = this.get('newUser');
            this.get('model').addObject(user);
            this.get('userProfileService').postUserProfileData(user)
                .then(alert("saved"));
            this.set('newUser', {});
        }

    },
    columns:[
        {
          "propertyName": "firstName"
        },
        {
          "propertyName": "lastName"
        },
        {
            "propertyName": "role"
          },
          {
            "propertyName": "email"
          },
          {
            "propertyName": "weeklyCommittedHours"
          }
        ]
});