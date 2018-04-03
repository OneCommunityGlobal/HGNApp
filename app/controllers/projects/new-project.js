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
    projectTeams: [],
    newTeam: {
      teamName: "",
      projectId:{}
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
    addTeams(id, teams){
      for(var i = 0; i < teams.length; i++){
        teams[i].projectId = id;
        this.get('dataService').postTeam(teams[i]);
      };
    this.transitionToRoute('projects');
  },

    actions: {
      addNewTask() {
        this.get('newProject.tasks').addObject(this.get('task'));
        this.set('task', {});
      },
      cancelTask(task) {
        this.get('newProject.tasks').removeObject(task);
      },
      addNewTeam(){
        this.get('projectTeams').addObject(this.get('newTeam'));
        this.set('newTeam', {});

      },
      cancelTeam(team){

      },
      addNewProject() {
        if (this.validateform()) {
        this.get('model').addObject(this.get('newProject'));
        let project = this.get('newProject');
        let projectTeams= this.get('projectTeams');
        this.get('projectService').postProject(project)
        .then(results => 
          this.addTeams(results,projectTeams)
        );
        toastr.success("", 'New Project Created!');

        this.set('newProject', {});

      }else {
          alert("Please fix the form errors");
      }
      },
    }
});
