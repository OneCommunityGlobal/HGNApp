import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Ember.Controller.extend({

    self: this,
    projectService: Ember.inject.service('project-service'),
    minProjectName: "2",
    maxProjectName: "100",
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
        this.transitionToRoute('projects');
      },
    }
});
