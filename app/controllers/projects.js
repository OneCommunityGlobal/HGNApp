
import { inject } from '@ember/service';
import { computed } from '@ember/object';


import Controller from '@ember/controller';

export default Controller.extend({

  //self: this,
  projectService: inject('project-service'),

  // newProject: {
  //   projectName: "",
  //   tasks: [],
  //   isActive: true
  // },
  // task: {
  //   Description: ""
  // },
  // project: {
  //   projectName: "",
  //   tasks: [],
  //   isActive: true
  // },
  isUserNotAdministrator: computed('userrole', function () {
    let userrole = this.get('userrole');
    return userrole === "Administrator" ? false : true;
  }),

  actions: {
    addNewTask() {
      this.get('newProject.tasks').addObject(this.get('task'));
      this.set('task', {});
    },
    cancelTask(task) {
      this.get('newProject.tasks').removeObject(task);
    },

    addNewProject() {
      this.get('model').addObject(this.get('newProject'));
      let project = this.get('newProject');
      this.get('projectService').postProject(project);
      this.set('newProject', {});
    },

    postChanges() {
      let projectId = this.get('projectId');
      let project = this.get('model');
      this.get('projectService').editProjectData(project, projectId);
    }
  }

});
