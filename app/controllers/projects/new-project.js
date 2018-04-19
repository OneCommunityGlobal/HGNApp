import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Ember.Controller.extend({
  isUserAdministrator: Ember.computed('userrole', function () {
    let userrole = this.get('userrole');
    //return userrole === "Administrator" ? true : false;

    return true;
  }),

  self: this,
  projectService: Ember.inject.service('project-service'),
  minProjectName: "2",
  maxProjectName: "100",
  newProject: {
    projectName: "",
    isActive: true
  },

  dataService: inject("datastore-service"),
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

    addNewProject() {
      if (this.validateform()) {
        let project = this.get('newProject');

        this.get('projectService').postProject(project)
          .then((results) => {
            toastr.success("", 'New Project Created!');
            this.set('newProject', {});
          },
            error => { toastr.error(error.responseJSON.error) }
          );

      } else {
        alert("Please fix the form errors");
      }
    },
    goBack() {
      this.transitionToRoute('projects');
    }
  }
});
