import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  isUserAdministrator: Ember.computed('userrole', function () {
      let userrole = this.get('userrole');
      //return userrole === "Administrator" ? true : false;

      return true;
  }),

  self: this,
  projectService: Ember.inject.service('project-service'),
  userProfileService: Ember.inject.service('user-profile-service'),
  dataService: inject("datastore-service"),
  projectName: "",
  users: [],
  teamMembers: [],
  projectName: computed(function(){this.get('projectService').getProjectById(this.get('model.projectId'))
            .then(results =>
              this.set('projectName', results.projectName));
            }),

  users: computed(function(){this.get('userProfileService').getAllUserProfiles()
  .then(results =>
    this.set('users', results)
  );
}),
  actions: {

    notifyChange(key) {
        let value = event.target.value;
        let property = "model." + key;
        this.set(property, value);
      },

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
  },
  saveChanges(){
    let team = this.get('model');
    let teamId = this.get('model._id');
    this.get('dataService').editTeamData(team, teamId);
  }

}

});
