import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  self: this,
  projectService: Ember.inject.service('project-service'),
  userProfileService: Ember.inject.service('user-profile-service'),
  projectName: "",

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
      this.getTeamMembers(results);
    }
  );
  },

}

});
