
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
export default Controller.extend({
    
    userProfileService: inject('user-profile-service'),
    users: alias('model'),
    currentFilter: null,
    user:{firtName:"",
          lastName: "",
          email:"",
          password:"Test@123",
          isActive:"",
          weeklyComittedHours:"",
          role:""
},

    filteredUsers: computed('users.@each.isActive', 'currentFilter', function() {
      if (this.get('currentFilter') === null) {
        return this.get('users');
      } else {
        var isActiveS = (this.get('currentFilter') == 'true');
        return this.get('users').filter(user => user.isActive === isActiveS);
      }
    }),

    actions: {
       
      filterUpdated: function (value) {
        if (value == "null") {
          this.set('currentFilter', null);
        }
        else {
          this.set('currentFilter', value);
        }
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
          "routeName":"/#profile",
          "routeProperty":"_id"
        },
        {
          "propertyName": "lastName",
          "title":"Last Name"
        },
        {
            "propertyName": "role",
            "title":"Role",
            "filterWithSelect":true,
            "disableSorting":true
          },
          {
            "propertyName": "email",
            "title":"Email",
            "disableSorting":true
          },
          {
            "propertyName": "weeklyComittedHours",
            "title":"Weekly Committed hrs"
          }
        ],

        customIcons :[{
          'sort-asc': 'fa fa-chevron-down',
          'sort-desc': 'fa fa-chevron-down'
        }]
});