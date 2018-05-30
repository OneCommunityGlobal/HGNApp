import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    isSubmitted:"",
    userProfileService: inject('user-profile-service'),

    clearForm() {
        $("#frmResetPwd")[0].reset();
        this.set("isSubmitted", "");
    },
    actions:{
        ResetPassword(){

            let form = $("#frmResetPwd").get(0);

            this.set("isSubmitted", "submitted");
            let toastr = this.get("toast");

            if (form.checkValidity()) {
                this.set("isSubmitted", "");
                let newPassword = this.get('password');
                let confirmPassword = this.get('confirmpassword');
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
