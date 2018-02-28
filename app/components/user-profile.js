import Ember from 'ember';
import UserProfileValidationMixin from '../mixins/user-profile-validation-mixin';

export default Ember.Component.extend(UserProfileValidationMixin, {
    self: this,
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

    actions: {

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
            let userId = this.get('model._id');
            let user = this.get('model');

            this.get('userProfileService').editUserProfileData(user, userId)
                .then(results => {
                    toastr.success("", 'Changes Saved');
                }, error => {
                    console.log(error);
                    toastr.warning(error.responseJSON.message, 'Error!!');
                });



        },
        removeTeamMembership(team) {
            var result = confirm("Are you sure you want to delete membership to this team?");
            if (result) {
                this.get('model.teamId').removeObject(team);
            }
        },

        addPersonalLink() {

            this.set('newLinkformValidate', true);

            this.validate()
                .then(() => {
                    this.get('model.personalLinks').addObject(this.get('newPersonalLink'));
                    this.set('newPersonalLink', {});
                    this.set('newLinkformValidate', false);
                })
                .catch(() => {
                    this.set('showFormErrors', true);
                })

                ;

        },

        CancelAddingPersonalLink() {

            this.set('newLinkformValidate', false);
            this.set('newPersonalLink', {});

        },

        CancelAddingAdminLink() {

            this.set('newLinkformValidate', false);
            this.set('newAdminLink', {});
        },

        removePersonalLink(personallink) {
            var result = confirm("Are you sure you want to remove this link?")
            if (result) {
                this.get('model.personalLinks').removeObject(personallink);
            }
        },
        addAdminLink() {

            let newLink = this.get('newAdminLink');

            if (newLink.Name.length < 1 || newLink.Link.length < 1 || !this.isLoggedinUserAdministrator) {

            } else {
                this.get('model.adminLinks').addObject(this.get('newAdminLink'));
                this.set('newAdminLink', {});
            }


        },
        removeAdminLink(adminLink) {
            var result = confirm("Are you sure you want to delete this link?");
            if (result) {
                if (this.isLoggedinUserAdministrator) {
                    this.get('model.adminLinks').removeObject(adminLink);
                }
            }
        }

    }
});
