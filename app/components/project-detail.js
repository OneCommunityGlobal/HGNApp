import Ember from 'ember';

export default Ember.Component.extend({
  init(){
      this._super(...arguments);
    },

  isProjectDetail: false,

  actions: {
    toggleProjectDetail() {
      this.toggleProperty('isProjectDetail');
    },
    addNewTask() {
      this.get('project.tasks').addObject(this.get('task'));
      this.set('task', {});
    },
    cancelTask(task) {
      this.get('project.tasks').removeObject(task);
    },

    destroyProject(project) {
      this.get('model').removeObject(project);
      this.get('projectService').deleteProject(project);
    },
    postChanges() {
      let projectId = this.get('projectId');
      let project = this.get('model');
      this.get('projectService').editProjectData(project, projectId);
    }
  }
});
