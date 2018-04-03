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
  showTeams: false,
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
    teamName:""
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
  getProjectTeams(){
    let projectId = this.get('model._id');
    let teams = [];
    return this.get('dataService').getAllTeams()
        .then(results => {
          for(var i = 0; i <results.length; i++){

            if(results[i].projectId === projectId){
              teams.push(results[i])
            }
        }
        this.set("projectTeams", teams);

      })
    },


  actions: {

    teamToggle() {
      this.getProjectTeams();
      this.toggleProperty('showTeams');
    },
    notifyChange(key) {
        let value = event.target.value;
        let property = "model." + key;
        this.set(property, value);
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
      let taskId = this.get('task._id');
      this.get('model.tasks').removeObject(task);
      this.get('projectService').deletetask(projectId, taskId);
      this.set('task', {});
    },
    destroyProject() {
      let project = this.get('model');
      this.get('projectService').deleteProject(project._id)
      .then(
          toastr.success('Project Removed!')
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

    }else {
        alert("Please fix the form errors");
    }
  },
  addNewTeam(){
    let projectId = this.get('model._id');
    let team = this.get('newTeam');
    team.projectId = projectId;
    this.get('projectTeams').addObject(this.get('newTeam'));
    this.get('dataService').postTeam(this.get('newTeam'));
    this.set('newTeam', "");
  },
  removeTeam(team){
  }

  }

});
