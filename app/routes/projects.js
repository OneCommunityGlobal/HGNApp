
import UnAuthenticatedRouteMixin from '../mixins/un-authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend(UnAuthenticatedRouteMixin, {

    projectService: inject('project-service'),
    model: function () {

        return this.get('projectService').getAllProjects();

    }

});
