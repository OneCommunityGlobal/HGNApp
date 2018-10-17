import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    isSubmitted:"",
    userProfileService: inject('user-profile-service'),
    errorlist: computed("showErrors.[]", function () {
        return (this.get("showErrors"));
    }),
    //future this function has to be changed to helper : combine logic for reset and update password
   
    validateForm() {
        this.set("isSubmitted", "submitted");
        this.set("showErrors", "");
        let passwordregex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let form = $("#frmResetPwd").get(0);
        let fnewPassword =  $("#resetpassword").get(0);
        let fconfirmnewPassword =$("#confirmresetpassword").get(0);
        let errormessagesarray = [];
        let errormessages = "";

        if (fconfirmnewPassword.validity.valid && fnewPassword.validity.valid) {
            fnewPassword.setCustomValidity("");
            fconfirmnewPassword.setCustomValidity("");
        }

        if (!passwordregex.test(fnewPassword.value) || !passwordregex.test(fconfirmnewPassword.value)) {

            let errormessage = "New password should be at least 8 characters long and must include at least one uppercase letter, one lowercase letter, and one number or special character"
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
        $("#frmResetPwd")[0].reset();
        this.set("isSubmitted", "");
    },
    actions:{
        ResetPassword(){
            let newPassword=this.get('password');
            let confirmPassword= this.get('confirmpassword');
                   
            let toastr = this.get("toast");
            let validity = this.validateForm();
           
            if (validity) {
                this.set("isSubmitted", "");
               
                let forUserId = this.get('userId');
               
                let resetPwdData = {
                    "newpassword": newPassword,
                    "confirmnewpassword": confirmPassword
                };

                this.get('userProfileService').ResetPassword(forUserId, resetPwdData)
                    .then(()=> {
                        $("[data-dismiss=modal]").trigger({ type: "click" });
                        toastr.success("", 'Password successfully reset');
                    },
                     error => {
                        toastr.warning(error.responseJSON.message, 'Error!!');
                    })
                this.clearForm();
                    
            }
        }
       
    }
});
