import { inject } from '@ember/service';
import { computed } from '@ember/object';


import Controller from '@ember/controller';


export default Controller.extend({
  display: "project",
  sortProjProperties: ['projectName:asc'],
  sortedProjects: Ember.computed.sort('projects', 'sortProjProperties'),
  sortPersonProperties: ['lastName:asc'],
  sortedPersons: Ember.computed.sort('persons', 'sortPersonProperties'),
  sortTeamProperties: ['teamName:asc'],
  sortedTeams: Ember.computed.sort('teams', 'sortTeamProperties'),
  actions: {
    submitForm(){
      let optionSelected = this.get('option');
      console.log(optionSelected.projectName);
      this.transitionToRoute('view-reports', {queryParams: {project_id: optionSelected._id, projectName: optionSelected.projectName}});
    },
    customOrAll(target){
      if (target == 'show') {
       document.getElementById('customPeriod').style.visibility = 'visible';
   }
   else document.getElementById('customPeriod').style.visibility = 'hidden';

 }
},
  optionSelect(target) {
    console.log(target);
    switch(target) {
      case 'project':
      this.set('display','project');
      break;
      case 'person':
      this.set('display','person');
      break;
      case 'task':
      this.set('display','task');
      break;
      case 'team':
      this.set('display','team');
      break;
    }

  },

});
