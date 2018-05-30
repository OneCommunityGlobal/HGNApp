import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../templates/components/select-row-checkbox';
import { inject } from '@ember/service';

export default Component.extend({
  layout,
  userProfileService: inject('user-profile-service'),
  actions: {
    clickOnRow(index, record) {
      let status ="";
      get(this, 'clickOnRow')(index, record);
      if (record.isActive) {
        status = "Active";
      }
      else {
        status = "InActive";
      }
      if (confirm(`Are you sure you want to change the persons' ${status} status?`)) {
        let toastr = this.get('toast');
        
        let data={
          "status" : status
        }
        this.get('userProfileService').changeUserStatus(record._id, data)
          .then(() => {
            toastr.success("User status updated Successfully");
          },
            error => { toastr.error("", error); }
          );
      }
      //event.stopPropagation();
    }
  }
});