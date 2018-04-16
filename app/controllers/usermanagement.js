
import { inject } from '@ember/service';
import Controller from '@ember/controller';
export default Controller.extend({
    
    userProfileService: inject('user-profile-service'),


    actions: {
       

        activeFilter: function () {
         return this.get('userProfileService').getActiveUserProfiles();
        },

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