
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

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
    showwarning: "",

    options: {
        plugins: ["link", "autolink"],
        menubar: "insert",
        toolbar: "",
        browser_spellcheck: true
    },

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
            this.set("showwarning", true);

        },

        updateProfilePic: function (event) {
            const file = event.target.files[0];
            let errormessages = [];
            let isValid = true;
            let maxFileSize_KB = 50;

            let validfileTypes = [
                'image/jpeg',
                'image/png'
            ]

            if (!validfileTypes.includes(file.type)) {
                isValid = false;
                errormessages.push(`File name ${file.name} is not a valid file type. Please update your selection.`);
            }

            let filesize_KB = file.size / 1024;

            if (filesize_KB > maxFileSize_KB) {
                isValid = false;
                errormessages.push(`Please limit the file size to ${maxFileSize_KB}KB by using another image or an online compressor like TinyPNG https://tinypng.com.`);

            }

            if (isValid) {
                const reader = new FileReader();
                let imageData;
                reader.onload = () => {
                    imageData = reader.result;
                    this.set('model.profilePic', imageData);

                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
            else {
                errormessages.forEach(element => {
                    toastr.error(element);

                });

            }

        },

        postChanges(isNewUser) {
            let toastr = this.get('toast');
            if (this.validateform()) {
                this.set('isFormSubmitted', "")
                let userId = this.get('model._id');
                let user = this.get('model');


                if (userId) {
                    this.get('userProfileService').editUserProfileData(user, userId)
                        .then(() => {
                            toastr.success("", 'Changes Saved');
                            this.set("showwarning", "");
                        }, error => {

                            toastr.warning(error.responseJSON.message, 'Error!!');
                        });
                }
                else {
                    this.get('userProfileService').postUserProfileData(user)
                        .then(() => {
                            toastr.success("", 'New user created successfully');

                            if (isNewUser) {
                                $("#userProfileForm")[0].reset();
                                $("[data-dismiss=modal]").trigger({ type: "click" });
                            }
                        }, error => {

                            toastr.warning(error.responseJSON.message, 'Error!!');
                        });

                }
            }
            else {
                alert("Please fix the form errors");
            }



        },

        reset: function () {
            $("#userProfileForm")[0].reset();
        }
    }

});
