import Controller from '@ember/controller';

export default Controller.extend({

  isSubmitted: "",

  actions: {
    submit() {

      let form = $("#frmforgotPwd").get(0);

      this.set("isSubmitted", "submitted");

      if(form.checkValidity()){
        this.set("isSubmitted", "");

        let email = this.get('email');
        let firstName = this.get('firstName');
        let lastName = this.get('lastName');

        let data = {
            "email": email,
            "firstName": firstName,
            "lastName" : lastName
          };
        this.get('AuthService').forgotpassword(data);
          
      }
      else{
        alert("Please enter mandatory fields");
      }
    }
}
})