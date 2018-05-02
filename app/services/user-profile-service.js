
import { inject } from '@ember/service';
import Service from '@ember/service';

export default Service.extend({

  dataService: inject('datastore-service'),

  getAllUserProfiles() {
    let relativePath = "/userprofile";
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    //console.log(request);
    return request;
  },

  getAllProjectMembers(projectId) {
    let relativePath = "/userprofile/project/" + projectId;
    let data = "";
    let method = "get";
    //console.log(relativePath);
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    //console.log(request);
    return request;
  },

  getUserProfileData(requestor) {

    let relativePath = "/userprofile/" + requestor.requestorId;
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  },
  editUserProfileData(user, userId) {

    let relativePath = "/userprofile/" + userId;
    let data = user;
    let method = "put";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },
  postUserProfileData(user) {

    let relativePath = "/userprofile";
    let data = user;
    let method = "post";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  updatepassword(forUserId, newpassworddata) {

    let relativePath = "/userprofile/" + forUserId + "/updatePassword";
    let data = newpassworddata;
    let method = "patch";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  },

  getTeamMembers(user) {

    let relativePath = "/userprofile/teammembers/" + user.requestorId;
    let data = null;
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  getUserName(userId) {

    let relativePath = "/userprofile/name/" + userId;
    let data = null;
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  }

});
