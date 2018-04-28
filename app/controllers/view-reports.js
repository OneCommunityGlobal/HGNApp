import Controller from '@ember/controller';


export default Controller.extend({
    needs: "view-reports",
  queryParams: ['project_id','projectName','FromDate', 'ToDate','custom'],
    project_id: null,
    projectName: '',
    mytemp: false,
    reports: Ember.inject.controller(),


    didInsertElement(){
      //console.log(this.get('reports').weekrange);
      if(this.get('reports').weekrange == 'true'){
        document.getElementById('weeks').style.display = "block";
      }

    },
});
