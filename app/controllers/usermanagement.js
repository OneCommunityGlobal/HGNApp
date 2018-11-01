import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import ENV from '../config/environment';

export default Controller.extend({
    
    userProfileService: inject('user-profile-service'),
    users: alias('model'),
    currentFilter: null,
    isShowingModal:false,
    showDeleteModal: true,
    recordForDeletion : {},
   
    user:{
      firtName:"",
          lastName: "",
          email:"",
          password:ENV.defaultPwd,
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
    toggleModal: function(){
      this.toggleProperty('isShowingModal');
    },
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
      setRecordForDeletion(record)
      {
        this.set("recordForDeletion", record);
       $("#showDeleteModalbtn").click()
        
      },
     
      async handleDeleteRequest(option) {
        let record = this.get("recordForDeletion")
        let toastr = this.get("toast");
        

        if (option == "delete"|| option == "archive")
        {
         try {
           let data = {option: option }
          await this.get('userProfileService').deleteUserProfile(record._id, data)             
          this.get('usersIdModified').removeObject(record);                       
          this.set("recordForDeletion", {});
          $("#closeDeleteUserModal").click()
          toastr.success("User Removed Succesfully");
           
         } catch (error) {
           toastr.error(error)
           
         }

      }
      else if (option == "Inactivate")
      {

      try {
        await this.get('userProfileService').changeUserStatus(record._id, false)
        $("#closeDeleteUserModal").click();
        toastr.success("User has been successfully inactivated");
        
      } catch (error) {
        toastr.error(error)
        
      }


      }

    }
  },
    
    columns:[
      {
        "title" : "Active/ Inactive",
        "component": "select-row-checkbox",
        "useFilter": false,
        "mayBeHidden": false
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

      
});