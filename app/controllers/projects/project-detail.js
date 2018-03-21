import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Ember.Controller.extend({
  isUserAdministrator: Ember.computed('userrole', function () {
      let userrole = this.get('userrole');
      return userrole === "Administrator" ? true : false;

      //return true;
  }),
  self: this,
  isFormSubmitted: "",
  minProjectName: "2",
  maxProjectName: "100",
  minTaskName: "2",
  maxTaskName: "100",

  projectService: Ember.inject.service('project-service'),
  task: {
    Description: ""
  },

  validateform() {
      this.set('isFormSubmitted', "submitted");

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
    notifyChange(key) {
        let value = event.target.value;
        let property = "model." + key;
        this.set(property, value);
        console.log(property);
      },

    addNewTask() {
      let projectId = this.get('model._id');
      let project = this.get('model');
      this.get('model.tasks').addObject(this.get('task'));
      this.get('projectService').editProjectData(project, projectId);
      this.set('task', {});
    },
    cancelTask(task) {
      let projectId = this.get('model._id');
      let project = this.get('model');
      this.get('model.tasks').removeObject(task);
      this.get('projectService').editProjectData(project, projectId);
      this.set('task', {});
    },
    destroyProject() {
      let project = this.get('model');
      this.get('projectService').deleteProject(project._id)
      .then(
          toastr.success('Project Removed!')
      );
},
    postChanges() {
      if (this.validateform()) {
          this.set('isFormSubmitted', "")
      let projectId = this.get('model._id');
      let project = this.get('model');
      this.get('projectService').editProjectData(project, projectId)
      .then(results => {
          toastr.success("", 'Changes Saved');
      });
      this.transitionToRoute('projects');

    }else {
        alert("Please fix the form errors");
    }
  }

  }

});
