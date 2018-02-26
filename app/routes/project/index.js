import Ember from 'ember';
import UnAuthenticatedRouteMixin from '../../mixins/un-authenticated-route-mixin';

export default Ember.Route.extend(UnAuthenticatedRouteMixin, {
    projectService: Ember.inject.service('project-service'),
    model() {

        return this.get('projectService').getAllProjects();
    }
});
