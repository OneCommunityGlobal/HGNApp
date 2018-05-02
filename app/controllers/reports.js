//import { inject } from '@ember/service';
//import { computed } from '@ember/object';
import moment from 'moment';
import {
    sort
} from '@ember/object/computed';
import Controller from '@ember/controller';


export default Controller.extend({
    display: "project",
    sortProjProperties: ['projectName:asc'],
    sortedProjects: sort('projects', 'sortProjProperties'),
    sortPersonProperties: ['lastName:asc'],
    sortedPersons: sort('persons', 'sortPersonProperties'),
    sortTeamProperties: ['teamName:asc'],
    sortedTeams: sort('teams', 'sortTeamProperties'),
    time: {},
    custom: 'false',
    weekrange: 'false',
    actions: {
        submitForm() {
            let optionSelected = this.get('option');
            //console.log(optionSelected.projectName);
            let selectedProject = this.get('sortedProjects').filter(function(project) {
              return project._id === optionSelected;
            })[0];
            //console.log(selectedProject);
            //custom time period - to get date from date picker
            if ((this.get('custom')) == 'true') {
                //console.log('custom');
                //console.log(moment($("#Todate").get(0).value).clone().format('DD/MM'));
                let todatevalue = moment($("#Todate").get(0).value).clone().format('X');
                let fromdatevalue = moment($("#Fromdate").get(0).value).clone().format('X');
                //console.log(todatevalue);
                let tempTime = {};
                //console.log(tempTime);
                tempTime.FromDate = fromdatevalue;
                tempTime.ToDate = todatevalue;
                this.set('time', tempTime);
                //console.log(this.get('time'));
            }

            if ((this.get('weekrange')) == 'true') {
                //console.log(this.get('weekselection'));
                let ToDate = moment().clone().startOf('isoWeek').format('X');
                let FromDate = moment(ToDate, 'X').clone().subtract(this.get('weekselection'), 'weeks').format('X');
                //console.log(FromDate);
                //console.log(ToDate);
                let tempTime = {};
                //console.log(tempTime);
                tempTime.FromDate = FromDate;
                tempTime.ToDate = ToDate;
                this.set('time', tempTime);

            }


            let timePeriod = this.get('time');
            this.transitionToRoute('view-reports', {
                queryParams: {
                    project_id: selectedProject._id,
                    projectName: selectedProject.projectName,
                    FromDate: timePeriod.FromDate,
                    ToDate: timePeriod.ToDate
                }
            });
        },
        customOrAll(target) {
            if (target == 'show') {
                document.getElementById('customPeriod').style.visibility = 'visible';
            } else document.getElementById('customPeriod').style.visibility = 'hidden';

        }
    },
    optionSelect(target) {
        //console.log(target);
        switch (target) {
            case 'project':
                this.set('display', 'project');
                break;
            case 'person':
                this.set('display', 'person');
                break;
            case 'task':
                this.set('display', 'task');
                break;
            case 'team':
                this.set('display', 'team');
                break;
        }

    },


    timeSelect(target) {
        switch (target) {
            case 'currentWeek':
                let FromDate = moment().startOf('isoWeek').format('X');
                let ToDate = moment().clone().format('X');
                let tempTime = {};
                tempTime.FromDate = FromDate;
                tempTime.ToDate = ToDate;
                this.set('time', tempTime);
                this.set('custom', 'false');
                this.set('weekrange', 'false');
                break;

            case 'weekRange':
                this.set('weekrange', 'true');
                break;


            case 'customPeriod':
                this.set('custom', 'true');
                this.set('weekrange', 'false');
                break;

        }

    }


});
