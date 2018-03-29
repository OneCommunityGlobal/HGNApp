import ENV from '../config/environment';

import Service from '@ember/service';
import $ from 'jquery';


export default Service.extend({

  createActionItem(actionItem) {
    let relativePath = "/actionItem";

    let data = actionItem;
    let method = "post";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },
  getActionItems(requestor) {
    let relativePath = "/actionItem/user/" + requestor.requestorId;

    let data = null;
    let method = "get";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },

  editActionItem(actionItem) {
    let relativePath = "/actionItem/" + actionItem._id;

    let data = actionItem;
    let method = "put";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },

  deleteActionItem(actionItem) {
    let relativePath = "/actionItem/" + actionItem._id;

    let data = null;
    let method = "delete";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },


  getUnreadNotifications(requestorId) {
    let relativePath = "/notification/user/" + requestorId;

    let data = null;
    let method = "get";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },

  deleteNotification(id) {
    let relativePath = "/notification/" + id;

    let data = null;
    let method = "delete";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },

  getAllTeams() {
    let relativePath = "/team/";

    let data = null;
    let method = "get";

    let request = this.createEmberrequestObject(relativePath, data, method);
    return request;

  },
  postTeam(team){
    let relativePath = "/team/";
    let data = team;
    let method = "post";
    let request = this.createEmberrequestObject(relativePath, data, method);

    return request;

  },
  getTeamById(teamId){
    let relativePath = "/team/" + teamId;
    let data = "";
    let method = "get";
    let request = this.createEmberrequestObject(relativePath, data, method);

    return request;


  },

  createEmberrequestObject(relativePath, data, method) {
    return $.ajax({
      "url": ENV.webServer + relativePath,
      "data": data,
      "method": method,
      "dataType": "JSON",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem(ENV.TOKEN_KEY));
      }
    });

  }

});
