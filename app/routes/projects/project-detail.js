import Route from '@ember/routing/route';
import { inject } from '@ember/service';
export default Route.extend({

  projectService: inject.service('project-service'),
  model(params) {

    return this.get('projectService').getProjectById(params.projectId);
  }
});
