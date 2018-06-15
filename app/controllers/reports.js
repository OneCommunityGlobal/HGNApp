import moment from 'moment';
import {
    sort
} from '@ember/object/computed';
import Controller from '@ember/controller';


export default Controller.extend({
    display: "Projects",
    sortProjProperties: ['projectName:asc'],
    sortedProjects: sort('projects', 'sortProjProperties'),
    sortPersonProperties: ['lastName:asc'],
    sortedPersons: sort('persons', 'sortPersonProperties'),
    sortTeamProperties: ['teamName:asc'],
    sortedTeams: sort('teams', 'sortTeamProperties'),
    sortedFinalProjects: [],
    sortedFinalPersons: [],
    time: {},
    custom: 'false',
    noofWeeks: 0,
    weekrange: 'true',
    viewreports: Ember.inject.controller('view-reports'),
    weekselection: '',


    init() {
        this._super(...arguments);
        this.set('weekselection', "8");
    },

    actions: {
      Custom(val) {
        if(val == 7){
          document.getElementById("showCustom").style.display = "block";
          this.set('weekrange', 'false');
          this.set('custom', 'true');
          this.set('noofWeeks', null);
        }
        else{
            document.getElementById("showCustom").style.display = "none";
            this.set('weekselection', val);
            this.set('weekrange', 'true');
            this.set('custom', 'false');
        }


      },
        submitForm(option, weekselection, custom, allprojects) {

            let optionSelected;
            let customPeriod = this.get('custom');
            let weekRange = this.get('weekrange');
            let weeks = this.get('weekselection');
            let reorgcustomPeriod = null;
            let projectlist = this.get('sortedProjects');
            let personlist = this.get('sortedPersons');


            //TopForm in reports page
            if (option !== undefined) {

                optionSelected = option;

                if (custom == null) {
                    weekRange = 'true';
                    weeks = weekselection;
                    customPeriod = 'false';
                } else {
                    reorgcustomPeriod = custom;
                    this.set('time', reorgcustomPeriod);
                    this.set('weekselection', "");
                    weekRange = 'false';
                    weeks = 0;
                    customPeriod = 'false';
                    this.set('noofWeeks', null);
                }
                projectlist = allprojects;

            } else {
                optionSelected = this.get('option');
            }

            //custom time period - to get date from date picker
            if (customPeriod == 'true') {
                let todatevalue = moment($("#Todate").get(0).value).clone().format('X');
                let fromdatevalue = moment($("#Fromdate").get(0).value).clone().format('X');
                let tempTime = {};
                tempTime.FromDate = fromdatevalue;
                tempTime.ToDate = todatevalue;
                this.set('time', tempTime);
            }
            //week

            if (weekRange == 'true') {
                if (weeks == "8" || weeks == "9") {
                    let FromDate = moment().startOf('isoWeek').format('X');
                    let ToDate = moment().clone().format('X');
                    let tempTime = {};
                    tempTime.FromDate = FromDate;
                    tempTime.ToDate = ToDate;
                    this.set('time', tempTime);
                    this.set('custom', 'false');
                    this.set('weekrange', 'false');
                    this.set('noofWeeks', 0);
                } else {
                    let ToDate = moment().clone().startOf('isoWeek').subtract(1, 'days').format('X');
                    let FromDate = moment(ToDate, 'X').clone().subtract(weeks, 'weeks').add(1, 'days').format('X');
                    this.set('noofWeeks', weeks);
                    let tempTime = {};

                    tempTime.FromDate = FromDate;
                    tempTime.ToDate = ToDate;
                    this.set('time', tempTime);
                    this.set('weekselection', "");
                }
            }

            let timePeriod = this.get('time');

            if(this.get('display') == 'Projects'){
              let selectedProject = projectlist.filter(function(project) {
                  return project._id === optionSelected;
              })[0];
              var name = selectedProject.projectName;
              var params = {
                project_id: optionSelected,
                projectName: name,
                person_id: null,
                personName: null,
                FromDate: timePeriod.FromDate,
                ToDate: timePeriod.ToDate,
                week: this.get('noofWeeks')
              };

            }
            else{
              let selectedPerson = personlist.filter(function(person) {
                  return person._id === optionSelected;
              })[0];
              name = selectedPerson.firstName+' '+selectedPerson.lastName;
              var params = {
                person_id: optionSelected,
                personName: name,
                project_id: null,
                projectName: null,
                FromDate: timePeriod.FromDate,
                ToDate: timePeriod.ToDate,
                week: this.get('noofWeeks')
              };
            }

            this.transitionToRoute('view-reports', {
                queryParams: params
            });

        },

    },
    optionSelect(target) {
        var ele = document.getElementsByName("isActive");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;
        switch (target) {
            case 'project':
                this.set('display', 'Projects');
                break;
            case 'person':
                this.set('display', 'Persons');
                break;
            case 'team':
                this.set('display', 'team');
                break;
        }
    },

    isActive(target) {
        let display = this.get('display');
        switch (target) {
            case 'active':
                let temp = (this.get('sorted' + display)).filter(function(item) {
                    return item.isActive == true;
                });
                this.set('sortedFinal' + display, temp);
                break;

            case 'inactive':
                let inactivetemp = (this.get('sorted' + display)).filter(function(item) {
                    return item.isActive == false;
                });
                this.set('sortedFinal' + display, inactivetemp);
                break;

            case 'all':
                this.set('sortedFinal' + display, this.get('sorted' + display));
                break;
        }

    },

    timeSelect(target) {
        switch (target) {
            case 'weekRange':
                this.set('weekrange', 'true');
                break;
            case 'customPeriod':
                this.set('custom', 'true');
                this.set('weekrange', 'false');
                this.set('noofWeeks', null);
                break;
        }
    }




});
