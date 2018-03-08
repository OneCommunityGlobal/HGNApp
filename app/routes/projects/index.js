import Ember from 'ember';

export default Ember.Route.extend({
    projectService: Ember.inject.service('project-service'),
    model: function () {

        return this.get('projectService').getAllProjects();

    }
});
