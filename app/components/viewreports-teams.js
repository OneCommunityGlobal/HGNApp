import Component from '@ember/component';

export default Component.extend({
  displayTeams : [],
  init(){
this._super();

    let selectedProject = this.get('option');
    let temp = [];
    let tempobj = {};
    let tempmem = [];

    this.get('teams').forEach(function(item){
      if(selectedProject === item.projectId){
       //console.log(item);
       temp.push(item.teamName);
      }
    });
   this.set('displayTeams',temp);
    this.get('persons').forEach(function(item){
      //console.log(item);
    });
    //console.log(tempobj);
}
});
