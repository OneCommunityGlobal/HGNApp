import Controller from '@ember/controller';
import moment from 'moment';
import Ember from 'ember';

import {
    sort
} from '@ember/object/computed';
export default Controller.extend({
    needs: "view-reports",
    queryParams: ['project_id', 'projectName','person_id','personName', 'FromDate', 'ToDate', 'week'],
    project_id: null,
    person_id: null,
    projectName: '',
    personName: '',
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
    isPersonReport: Ember.computed('project_id', function(){
      return (this.get('project_id') == null);
    }),
    data_changed: 'true',

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
            this.set('data_changed', !(this.get('data_changed')));
        },


    }




});
