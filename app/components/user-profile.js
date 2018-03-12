
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
    self: this,
    isFormSubmitted: "",
    minNamelength: "2",
    maxnameLength: "100",
    minLinksNameLength: "3",
    maxLinksNameLength: "100",
    minWeeklyCommittedHours: "0",
    maxWeeklyCommittedHours: "100",
    userProfileService: inject('user-profile-service'),
    showErrors: true,
    showFormErrors: false,
    newProfilePic: "",



    isLoggedinUserAdministrator: computed('userrole', function () {

        let userrole = this.get('userrole');
        return userrole === "Administrator" ? true : false;

    }),

    canUserEditPersonalFields: computed('model', 'userId', 'userrole', function () {

        let loggedinUser = this.get('userId');
        let viewingProfileOf = this.get('model._id');
        let userrole = this.get('userrole');

        return (loggedinUser === viewingProfileOf || userrole === "Administrator") ? true : false;


    }),
    validateform() {
        this.set('isFormSubmitted', "submitted");

        let inputs = $("input").not("div.modal input").get();

        let isFormValid = true;

        inputs.forEach(element => {

            if (!element.validity.valid) {
                isFormValid = false;
            }
        });
        return isFormValid;
    },


    actions: {

        updateProperty(key, value) {
            let property = "model." + key;
            this.set(property, value);

        },

        updateProfilePic: function (event) {
            const reader = new FileReader();
            const file = event.target.files[0];
            let imageData;

            reader.onload = () => {
                imageData = reader.result;
                this.set('model.profilePic', imageData);

            };

            if (file) {
                reader.readAsDataURL(file);
            }
        },

        postChanges() {
            if (this.validateform()) {
                this.set('isFormSubmitted', "")
                let userId = this.get('model._id');
                let user = this.get('model');
                toastr = this.get('ToastrService');

                if (userId) {
                    this.get('userProfileService').editUserProfileData(user, userId)
                        .then(results => {
                            toastr.success("", 'Changes Saved');
                        }, error => {

                            toastr.warning(error.responseJSON.message, 'Error!!');
                        });
                }
                else {
                    this.get('userProfileService').postUserProfileData(user)
                        .then(results => {
                            toastr.success("", 'New user created successfully');
                        }, error => {

                            toastr.warning(error.responseJSON.message, 'Error!!');
                        });

                }
            }
            else {
                alert("Please fix the form errors");
            }



        }

    }

});
