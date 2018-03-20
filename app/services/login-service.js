
import ENV from '../config/environment';
import jwtDecode from 'ember-cli-jwt-decode';
import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({

  host: ENV.webServer,
  router: Ember.inject.service(),
  login(data) {
    let self = this;
    let router = this.get('router');

    let loginPromise = $.ajax({
      url: this.host + "/login",
      type: "POST",
      data: data
    })
      .then(
        result => {
          localStorage.setItem(ENV.TOKEN_KEY, result.token);
          router.transitionTo('application');
        }, error => {
          alert("Invalid credentials");
          console.log(error.responseText)
        }
      )


  },



  isAuthenticated() {

    if (!localStorage.getItem(ENV.TOKEN_KEY)) {

      return false;
    }
    let token = localStorage.getItem(ENV.TOKEN_KEY);
    token = jwtDecode(token);

    return (token.expiryTimestamp > new Date().toISOString());
  },
  logout() {

    localStorage.removeItem(ENV.TOKEN_KEY);
    this.set('loggedinUser', "");
    this.get('router').transitionTo('login');
  },

  getLoggedinUser() {

    return $.ajax({
      url: this.host + "/login",
      type: "GET",
      cache: "true",
      beforeSend: function (xhr) { xhr.setRequestHeader(ENV.REQUEST_AUTHKEY, localStorage.getItem(ENV.TOKEN_KEY)); }
    });

  },


});

