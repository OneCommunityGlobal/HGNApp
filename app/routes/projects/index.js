
import { inject } from '@ember/service';
import Route from '@ember/routing/route';
import UnAuthenticatedRouteMixin from '../../mixins/un-authenticated-route-mixin';

export default Route.extend(UnAuthenticatedRouteMixin, {
    projectService: inject('project-service'),
    model: function () {
        return this.get('projectService').getAllProjects();

    }
});
