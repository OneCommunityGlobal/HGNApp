import Component from '@ember/component';
import {get} from '@ember/object';
import layout from '../templates/components/delete-row-comp';
import { inject } from '@ember/service';

export default Component.extend({layout,

  click(){
    let onClick = get(this, "onClick");
    if (onClick) {
      onClick(get(this, "record"));
      event.stopPropagation();
    }
  }
 // userProfileService: inject('user-profile-service'),
   
      // actions:{
        
      //   deleteUserForEver: function(record){
      //     let toastr = this.get('toast');
      //     alert(JSON.stringify(record._id));
      //     this.get('userProfileService').deleteUserProfile(record._id)
      //         .then(()=>{
      //            toastr.success("User deleted Successfully"); 
      //         },
      //         error => { toastr.error("", error); }
      //       );
      //   },

      //   makeUserInactive:function(index,record){
      //     let toastr = this.get('toast');
      //     if(record.isActive){
      //     let data= {
      //       "status" :  "InActive" 
      //     }
      //     this.get('userProfileService').changeUserStatus(record._id,data)
      //     .then(() => {
      //       toastr.success("User status updated Successfully");   
      //     },
      //       error => { toastr.error("", error); }
      //     );
      //     alert(JSON.stringify(record));
      //   }
      //   else{
      //     alert("The user is already inactive");
      //   }
      // },

      //   archiveUser:function(record){
      //     alert(JSON.stringify(record));
      //   }
      // }

     
});
