import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  self: this,
  projectService: Ember.inject.service('project-service'),
  userProfileService: Ember.inject.service('user-profile-service'),
  dataService: inject("datastore-service"),
  projectName: "",
  user: [],
  teamMembers: [],
  getTeamMembers(users){
    console.log(users);
    //for(var i = 0; i < users.length; i++){
      //console.log(users[i]);

      //console.log(us)

    //}
  },
  actions: {

  getProjectName(){
    let projectId = this.get('model.projectId');
    let project = this.get('projectService').getProjectById(projectId)
    .then(results =>
      this.set('projectName', results.projectName)
  )},
  getUsers(){
    this.get('userProfileService').getAllUserProfiles()
    .then(results => {
      this.set('users', results);
    }
  );
  },
  deleteTeam(){
    let teamId = this.get('model._id');
    this.get('dataService').deleteTeam(teamId)
    .then(alert('deleted!'));
  }

}

});
