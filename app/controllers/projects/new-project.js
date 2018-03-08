import Ember from 'ember';

export default Ember.Controller.extend({

    self: this,
    projectService: Ember.inject.service('project-service'),

    newProject: {
      projectName: "",
      tasks: [],
      isActive: true
    },
    task: {
      Description: ""
    },
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


    }
});
