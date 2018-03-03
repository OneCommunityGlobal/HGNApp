import Ember from 'ember';

export default Ember.Component.extend({
    self: this,
    isFormSubmitted: "",
    minNamelength: "2",
    maxnameLength: "100",
    minLinksNameLength: "3",
    maxLinksNameLength: "100",
    minWeeklyCommittedHours: "0",
    maxWeeklyCommittedHours: "100",
    userProfileService: Ember.inject.service('user-profile-service'),
    showErrors: true,
    showFormErrors: false,
    newPersonalLink: {
        Name: "",
        Link: ""
    },
    newAdminLink: {
        Name: "",
        Link: ""
    },
    newProfilePic: "",
    newLinkformValidate: false,


    isLoggedinUserAdministrator: Ember.computed('userrole', function () {

        let userrole = this.get('userrole');
        return userrole === "Administrator" ? true : false;

    }),

    canUserEditPersonalFields: Ember.computed('model', 'userId', 'userrole', function () {

        let loggedinUser = this.get('userId');
        let viewingProfileOf = this.get('model._id');
        let userrole = this.get('userrole');

        return (loggedinUser === viewingProfileOf || userrole === "Administrator") ? true : false;


    }),
    validateform() {
        this.set('isFormSubmitted', "submitted");

        let inputs = Ember.$("input").not("div.modal input").get();

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

                this.get('userProfileService').editUserProfileData(user, userId)
                    .then(results => {
                        toastr.success("", 'Changes Saved');
                    }, error => {
                        console.log(error);
                        toastr.warning(error.responseJSON.message, 'Error!!');
                    });
            }
            else {
                alert("Please fix the form errors");
            }



        },
        removeTeamMembership(team) {
            var result = confirm("Are you sure you want to delete membership to this team?");
            if (result) {
                this.get('model.teamId').removeObject(team);
            }
        }

    }

});
