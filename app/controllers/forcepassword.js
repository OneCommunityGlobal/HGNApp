import Controller from '@ember/controller';
import { computed } from '@ember/object';


//future: have to combine force and reset pwd modules.

export default Controller.extend({

  isSubmitted: "",
  errorlist: computed("showErrors.[]", function () {
    return (this.get("showErrors"));
  }),
  valid:function () {
    let form = $("#frmforcePwd").get(0);
      let newPwd = $("#newPwd").get(0);
      let confirmPwd = $("#confirmPwd").get(0);
      let passwordregex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
      let errormessagesarray = [];
      let errormessages = "";
      this.set("isSubmitted", "submitted");
      this.set("showErrors", "");
  
    if (newPwd.validity.valid && confirmPwd.validity.valid) {
      newPwd.setCustomValidity("");
      confirmPwd.setCustomValidity("");
  }
    if (!passwordregex.test(newPwd.value) || !passwordregex.test(confirmPwd.value)) {
      let errormessage = "New password should be at least 8 charcaters long with uppercase, lowercase and number/special char"
      errormessages += errormessage;
      errormessagesarray.push(errormessage);
    }
    if (newPwd.value != confirmPwd.value) {
      let errormessage = "New password and confirm password fields don't match"
      errormessages += errormessage;
      errormessagesarray.push(errormessage);
    }
    newPwd.setCustomValidity(errormessages);
    confirmPwd.setCustomValidity(errormessages);
    this.set('showErrors', errormessagesarray);
    return form.checkValidity();

  },
  clearForm() {
    $("#frmforcePwd")[0].reset();
    this.set("isSubmitted", "");
},
  actions: {
    submit(userId) {
      
      let newPwd=this.get('newPwd');
      let confirmPwd=this.get('confrimPwd');
     
      let valid = this.valid();
      if (valid) {
        
        this.set("isSubmitted", "");
  
        let data = {
          "userId":userId,
          "newpassword": newPwd || confirmPwd
        };
        this.get('AuthService').forcepassword(data);

        this.clearForm();
      }
     
    }
  }
})