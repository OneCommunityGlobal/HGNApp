import Component from '@ember/component';
import layout from '../templates/components/select-row-checkbox';
import { inject } from '@ember/service';


export default Component.extend({
  layout,
  userProfileService: inject('user-profile-service'),
  actions: {
    clickOnRow(index, record,event) {
      let status ="";

      if (record.isActive) {
        status = "active";
      }
      else {
        status = "inactive";
      }
      if (confirm(`Are you sure you want to change the person's ${status} status?`)) {
        let toastr = this.get('toast');
        
        let data={
          "status" : (record.isActive)? "InActive" : "Active"
        }
        this.get('userProfileService').changeUserStatus(record._id, data)
          .then(() => {
            toastr.success("User status updated Successfully"); 
            this.sendAction('refresh');
          },
            error => { toastr.error("", error); }
          );
      }
      else{
        event.preventDefault();
      }
    }
  }
});
