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
    reports: Ember.inject.controller(),

    actions: {
        submitForm() {
            let custom;
            //console.log(this.get('period'));
            if (this.get('period') == 'weekRange') {
                custom = null;
                this.get('reports').send('submitForm', this.get('option'), this.get('weekselection'), custom, this.get('sortedProjects'));
            }
            if (this.get('period') == 'customPeriod') {
                let todatevalue = moment($("#ToDate").get(0).value).clone().format('X');
                let fromdatevalue = moment($("#FromDate").get(0).value).clone().format('X');
                let tempTime = {};
                tempTime.FromDate = fromdatevalue;
                tempTime.ToDate = todatevalue;
                custom = tempTime;
                this.get('reports').send('submitForm', this.get('option'), 0, custom, this.get('sortedProjects'));

            }
            window.location.reload(true);
        },


    }




});
