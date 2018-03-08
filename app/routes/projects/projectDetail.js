import Ember from 'ember';
export default Ember.Route.extend({

  projectService: Ember.inject.service('project-service'),
  model(params) {
    alert(params)
    return this.get('projectService').getProjectById(params.projectId);
  }
});
