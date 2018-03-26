import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

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
    validateform() {
        let inputs = Ember.$("input").get();
        let isFormValid = true;
        inputs.forEach(element => {
            if (!element.validity.valid) {
                isFormValid = false;
            }
        });
        return isFormValid;
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
        if (this.validateform()) {
        this.get('model').addObject(this.get('newProject'));
        let project = this.get('newProject');
        this.get('projectService').postProject(project)
        .then(results => {
            toastr.success("", 'Changes Saved');
        });
        this.set('newProject', {});
        this.transitionToRoute('projects');

      }else {
          alert("Please fix the form errors");
      }
      },
    }
});
