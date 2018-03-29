import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
    isSubmitted: "",
    userProfileService: inject('user-profile-service'),
    loginService: inject('login-service'),
    toastr: inject("ToastrService"),
    errorlist: computed("showErrors.[]", function () {

        return (this.get("showErrors"));

    }),

    validateForm() {
        this.set("isSubmitted", "submitted");
        this.set("showErrors", "");
        let passwordregex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let fCurrentPassword = $("#id_current_password").get(0);
        let fnewPassword = $("#id_new_password").get(0);
        let fconfirmnewPassword = $("#id_confirm_newpassword").get(0);
        let form = $("#frmupdatepassword").get(0);
        let errormessagesarray = [];
        let errormessages = "";


        if (fCurrentPassword.validity.valid && fnewPassword.validity.valid) {
            fnewPassword.setCustomValidity("");
            fconfirmnewPassword.setCustomValidity("");
        }


        if (fCurrentPassword.validity.valid && fnewPassword.validity.valid && (fCurrentPassword.value === fnewPassword.value)) {
            let errormessage = "Old and new passwords should not be same";
            errormessages += errormessage;
            errormessagesarray.push(errormessage);

        }


        if (!passwordregex.test(fnewPassword.value) || !passwordregex.test(fconfirmnewPassword.value)) {

            let errormessage = "New password should be at least 8 charcaters long with uppercase, lowercase and number/special char"
            errormessages += errormessage;
            errormessagesarray.push(errormessage);
        }



        if (fnewPassword.value != fconfirmnewPassword.value) {
            let errormessage = "New password and confirm password fields don't match"
            errormessages += errormessage;
            errormessagesarray.push(errormessage);

        }
        fnewPassword.setCustomValidity(errormessages);
        fconfirmnewPassword.setCustomValidity(errormessages);

        this.set('showErrors', errormessagesarray);
        return form.checkValidity();

    },

    clearForm() {
        $("#frmupdatepassword")[0].reset();
        this.set("isSubmitted", "");


    },


    actions:
        {
            updatePassword() {
                let forUserId = ""

                let toastr = this.get("toastr");

                if (!this.get('forUserId')) {
                    forUserId = this.get('userId');
                }
                else {
                    forUserId = this.get('forUserId');
                }

                if (this.validateForm()) {

                    let newpassworddata =
                        {
                            "currentpassword": this.get("currentpassword"),
                            "newpassword": this.get("newpassword"),
                            "confirmnewpassword": this.get("confirmnewpassword")

                        }
                    this.get('userProfileService').updatepassword(forUserId, newpassworddata)
                        .then(results => {
                            if (forUserId == this.get("userId")) {
                                let loginservice = this.get('loginService');

                                toastr.success("", 'Password has been updated.Please login into the system using your new password');
                                toastr.subscribe(function () {
                                    loginservice.logout();
                                });

                            }
                            else {
                                toastr.success("", 'Password successfully updated');
                            }

                        }, error => {

                            toastr.warning(error.responseJSON.message, 'Error!!');
                        });

                    this.clearForm();

                }

            },
            clearForm() {

                this.clearForm();
            }

        }
});
