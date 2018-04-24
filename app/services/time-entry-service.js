
import { inject } from '@ember/service';
import Service from '@ember/service';

export default Service.extend({
  dataService: inject('datastore-service'),

  getUserProjects(requestorId) {
    let relativePath = "/TimeEntry/user/projects/" + requestorId;
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  getTimeEntriesForPeriod(userid, fromdate, todate) {

    let relativePath = "/TimeEntry/user/" + `${userid}/${fromdate}/${todate}`;
    let data = null;
    let method = "get";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  },

  getTimeEntriesForProject(projectid, fromdate, todate) {
    //console.log('called');
    let relativePath = "/TimeEntry/projects/" + `${projectid}/${fromdate}/${todate}`;
    let data = null;
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
  },

  updateTimeEntry(timeEntryId, timeEntry) {
    let relativePath = "/TimeEntry/" + timeEntryId;
    let data = timeEntry;
    let method = "put";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  deleteTimeEntry(timeEntryId) {
    let relativePath = "/TimeEntry/" + timeEntryId;
    let data = null;
    let method = "delete";
    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  }
});
