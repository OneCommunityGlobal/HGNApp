import Controller from '@ember/controller';


export default Controller.extend({

  isSubmitted: "",

  actions: {
    async submit() {

      let form = $("#frmforgotPwd").get(0);

      this.set("isSubmitted", "submitted");

      if(!form.checkValidity())
      {
        alert("Please enter mandatory fields");
        return;
      }


      
        this.set("isSubmitted", "");

        let email = this.get('email');
        let firstName = this.get('firstName');
        let lastName = this.get('lastName');

        let data = {
            "email": email,
            "firstName": firstName,
            "lastName" : lastName
          };
          let toastr = this.get("toast");
        try{ await this.get('AuthService').forgotpassword(data);
        toastr.success("An email has been sent to you with the new password. You can now login with the new password");
        this.transitionToRoute("login");
        }
        catch(error){
          if (error.status === 400 && error.responseJSON.error === "No Valid user was found")
          {
            
            toastr.error("Oops, something went wrong! You’ve either input an incorrect email or name spelling and that just won’t do. Please try again.")
          }


        }
        
    
    }
}
})