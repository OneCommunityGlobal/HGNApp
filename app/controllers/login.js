import Controller from '@ember/controller';

export default Controller.extend({

  isSubmitted: "",

  actions: {
    login() {

      let form = $("#frmlogin").get(0);

      this.set("isSubmitted", "submitted");

      if (form.checkValidity()) {
        this.set("isSubmitted", "");

        let email = this.get('email');
        let password = this.get('password');
        let self = this;
        let logindata = {
          "email": email,
          "password": password
        };


        this.get('AuthService').login(logindata);

        // loginPromise
        //   .then(function (result) {
        //     localStorage.setItem(ENV.TOKEN_KEY, result);
        //     self.transitionToRoute('application');
        //   }, function (error) {
        //     alert("Invalid credentials");
        //     console.log(error.responseText)
        //   })
      }
      else {

        alert("Please enter mandatory fields");
      }


    }
  }
});
