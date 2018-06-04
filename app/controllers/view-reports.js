import Controller from '@ember/controller';

import {
    sort
} from '@ember/object/computed';
export default Controller.extend({
    needs: "view-reports",
    queryParams: ['project_id', 'projectName', 'FromDate', 'ToDate', 'week'],
    project_id: null,
    projectName: '',
    sortProjProperties: ['projectName:asc'],
    sortedProjects: sort('projects', 'sortProjProperties'),
    mytemp: false,
    week: '',
    isCurrent: Ember.computed('week', function(){
      return (this.get('week') == '0');
    }),
    isCustom:  Ember.computed('week', function(){
      return (this.get('week') == '');
    }),
    reports: Ember.inject.controller(),
    isWeek: Ember.computed('week', function(){
      return (this.get('week') == '2' || '4' || '6');
    }),
    custom: 'false',
    weekselection: 8,

    option: '',

    init() {
let prevvalue = String(sessionStorage.getItem("SelectedItem"));
   if(prevvalue != null){

   }

},

    actions: {
      ReOrgOption(val){
        this.set('option',val);
      },
      ReorgCustom(val){
        if(val == 7){
          document.getElementById("ShowCustom").style.display = "block";
          this.set('custom', 'true');
          this.set('weekselection',0);
        }
        else{
            document.getElementById("ShowCustom").style.display = "none";
            this.set('weekselection', val);
            this.set('custom', 'false');
        }

      },
        submitForm() {

          let val = $("#projdropdown2 :selected").val();
          sessionStorage.setItem('SelectedItem', val);

            //console.log(this.get('period'));
            if (this.get('weekselection') == 0) {

                let todatevalue = moment($("#ToDate").get(0).value).clone().format('X');
                let fromdatevalue = moment($("#FromDate").get(0).value).clone().format('X');
                let tempTime = {};
                tempTime.FromDate = fromdatevalue;
                tempTime.ToDate = todatevalue;
                this.set('custom', tempTime);
            }
             else {

                this.set('custom',null);

            }

            this.get('reports').send('submitForm', this.get('option'),this.get('weekselection') , this.get('custom'), this.get('sortedProjects'));
            window.location.reload(true);
            //this.set('reload',true);
        },


    }




});
