import Route from '@ember/routing/route';
export default Route.extend({

  projectService: Ember.inject.service('project-service'),
  model(params) {

    return this.get('projectService').getProjectById(params.projectId);
  }
});
