import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import $ from 'jquery';


export default Ember.Controller.extend({
  isUserAdministrator: Ember.computed('userrole', function () {
    let userrole = this.get('userrole');
    //return userrole === "Administrator" ? true : false;

    return true;
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
  newTeam: {
    teamName: ""
  },
  projectTeams: "",
  dataService: inject("datastore-service"),

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
  projectTeams: computed(function () {
    let projectId = this.get('model._id');
    let allteams = [];
    return this.get('dataService').getAllTeams()
      .then(results => {
        for (var i = 0; i < results.length; i++) {

          if (results[i].projectId === projectId) {
            allteams.push(results[i])
          }
        }
        this.set("projectTeams", allteams);

      })
  }),


  actions: {


    notifyChange(key) {
      let value = event.target.value;
      let property = "model." + key;
      this.set(property, value);
    },


    destroyProject() {
      let project = this.get('model');
      this.get('projectService').deleteProject(project._id)
        .then(results => { toastr.success('Project Removed!') },
          error => { toastr.warning(error.responseJSON.error) }

        );
      this.transitionToRoute('projects');

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

      } else {
        alert("Please fix the form errors");
      }
    },


  }

});
