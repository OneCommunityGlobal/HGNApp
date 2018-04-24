
import { inject } from '@ember/service';
import Service from '@ember/service';

export default Service.extend({

  dataService: inject("datastore-service"),


  getAllProjects() {

    let relativePath = "/project";
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

    return request;
  },

  getProjectById(projectId) {
    let relativePath = "/project/" + projectId;
    let data = "";
    let method = "get";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

    return request;
  },

  postProject(project) {
    let relativePath = "/project/";
    let data = project;
    let method = "post";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);

    return request;
  },

  editProjectData(project, projectId) {
    let relativePath = "/project/" + projectId;
    let data = project;
    let method = "put";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  deleteProject(projectid) {
    let relativePath = "/project/" + projectid;
    let data = null;
    let method = "delete";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;
  },

  deletetask(projectId, taskId) {
    let relativePath = "/project/" + projectId + "/task/" + taskId;
    let data = null;
    let method = "delete";

    let request = this.get('dataService').createEmberrequestObject(relativePath, data, method);
    return request;

  }
});
