
import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
    projectService: inject('project-service'),
    model: function () {
        return this.get('projectService').getAllProjects();

    }
});
