
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
//computed to change _id to id to pass to addon's routeName.
  usersIdModified: computed('users', function () {
    var modUsers = this.get('users');
    var idUser = [];
    modUsers.forEach(user => { user.id = user._id; idUser.push(user) });
    return modUsers;
  }),

    filteredUsers: computed('usersIdModified.@each.isActive', 'currentFilter', function() {
      if (this.get('currentFilter') === null) {
        return this.get('usersIdModified');
      } else {
        var isActiveS = (this.get('currentFilter') == 'true');
        return this.get('usersIdModified').filter(user => user.isActive === isActiveS);
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
      },

      close: function () {
        $("#userProfileForm")[0].reset();
        this.get('target').send('refresh');
      },

      deleteRecord(record) {
       
        if (confirm("Are you sure you want to delete this user? Note: You cannot retrieve the user back.")) {
          let toastr = this.get('toast');
          this.get('userProfileService').deleteUserProfile(record._id)
            .then(() => {
              this.get('usersIdModified').removeObject(record);
              toastr.success("User Removed Succesfully");
            },
              error => { toastr.error("", error); }
            )
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
          "routeName":"profile",
          "sortPrecedence":0
        },
        {
          "propertyName": "lastName",
          "title":"Last Name",
          "routeName":"profile",
          
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
          },
          {
            "component": "deleteRow"
          }
        ],

        customIcons :[{
          'sort-asc': 'fa fa-chevron-down',
          'sort-desc': 'fa fa-chevron-down'
        }]
});