
import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
  },

  isProjectDetail: false,

  actions: {
    toggleProjectDetail() {
      this.toggleProperty('isProjectDetail');
    },
    addNewTask() {
      this.get('project.tasks').addObject(this.get('task'));
      this.get('projectService').editProjectData();
      this.set('task', {});
    },
    cancelTask(task) {
      this.get('project.tasks').removeObject(task);
    },

    destroyProject() {
      let _project = this.get('project');
      this.get('model').removeObject(_project);
      this.get('projectService').deleteProject(_project._id);
    },
    postChanges() {
      let projectId = this.get('projectId');
      let project = this.get('model');
      this.get('projectService').editProjectData(project, projectId);
    }
  }
});
