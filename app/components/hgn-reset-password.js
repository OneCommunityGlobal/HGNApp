import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    isSubmitted:"",
    userProfileService: inject('user-profile-service'),
    errorlist: computed("showErrors.[]", function () {

        return (this.get("showErrors"));

    }),
    validateForm(newPassword,confirmPassword,form) {
        this.set("isSubmitted", "submitted");
        this.set("showErrors", "");
        let passwordregex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let errormessagesarray = [];
        let errormessages = "";
        let fnewPassword=newPassword;
        let fconfirmnewPassword=confirmPassword;


        if (fconfirmnewPassword.validity.valid && fnewPassword.validity.valid) {
            fnewPassword.setCustomValidity("");
            fconfirmnewPassword.setCustomValidity("");
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
        $("#frmResetPwd")[0].reset();
        this.set("isSubmitted", "");
    },
    actions:{
        ResetPassword(){
            

            let form = $("#frmResetPwd").get(0);
            let newPassword =  $("#resetpassword").get(0);
            let confirmPassword =$("#confirmresetpassword").get(0);
            
            let toastr = this.get("toast");
            let validity = this.validateForm(newPassword,confirmPassword,form);
           
            if (validity) {
                this.set("isSubmitted", "");
               
                let forUserId = this.get('userId');
               
                let resetPwdData = {
                    "newpassword": newPassword,
                    "confirmnewpassword": confirmPassword
                };


                this.get('userProfileService').ResetPassword(forUserId, resetPwdData)
                    .then(results=> {
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
