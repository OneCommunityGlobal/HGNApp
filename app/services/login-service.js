
import ENV from '../config/environment';
import jwtDecode from 'ember-cli-jwt-decode';
import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({

  host: ENV.webServer,
  router: Ember.inject.service(),
  login(data) {

    let loginPromise = $.ajax({
      url: this.host + "/login",
      type: "POST",
      data: data
    });


    return loginPromise;
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

