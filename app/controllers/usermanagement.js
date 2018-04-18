
import { inject } from '@ember/service';
import Controller from '@ember/controller';
export default Controller.extend({
    
    userProfileService: inject('user-profile-service'),

    actions: {
       

        activeFilter: function () {
         return this.get('userProfileService').getActiveUserProfiles();
        }

    },
    
    columns:[
      {
        "component": "select-row-checkbox",
        "useFilter": false,
        "mayBeHidden": false,
        "componentForSortCell": "select-all-rows-checkbox"
      },
        {
          "propertyName": "firstName",
          "title":"First Name",
          "routeName":"/"
        },
        {
          "propertyName": "lastName",
          "title":"Last Name"
        },
        {
            "propertyName": "role",
            "title":"Role",
            "filterWithSelect":true
          },
          {
            "propertyName": "email",
            "title":"Email",
            "sorting":false
          },
          {
            "propertyName": "weeklyComittedHours",
            "title":"Weekly Committed hours"
          }
        ],

        customIcons :[{
          'sort-asc': 'fa fa-chevron-down',
          'sort-desc': 'fa fa-chevron-down'
        }]
});