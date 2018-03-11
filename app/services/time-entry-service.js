
import { inject } from '@ember/service';
import Service from '@ember/service';

export default Service.extend({
  dataService: inject('datastore-service'),

  getUserProjects(requestor) {
    let relativePath = "/TimeEntry/user/projects/" + requestor.requestorId;
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  postTimeEntry(timeEntry) {
    let relativePath = "/TimeEntry";
    let data = timeEntry;
    let method = "post";


    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  }
});
