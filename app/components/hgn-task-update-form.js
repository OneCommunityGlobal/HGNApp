
import moment from 'moment';
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({

    timeEntryService: inject('time-entry-service'),
    projectService: inject("project-service"),
    notes: "",
    dateofWork: "",
    taskhours: 0,
    taskminutes: 0,
    isTangible: true,
    isFormSubmitted: "",
    options: {
        plugins: ["link", "autolink"],
        menubar: false,
        toolbar: ["cut copy paste link numlist bullist outdent indent"],
        browser_spellcheck: true

    },


    init() {
        this._super(...arguments);
        this.set("projects", []);
    },

    didReceiveAttrs() {
        this._super(...arguments);
        let user = this.get('forUserId');
        if (user) {
            this.get('projectService').getUserProjects(user)
                .then(results => { this.set('projects', results); });
        }
    },


    didUpdateAttrs() {
        this._super(...arguments);
        let user = this.get('forUserId');
        this.get('projectService').getUserProjects(user)
            .then(results => { this.set('projects', results); });
    },

    minDateForLogging: computed("loggedinUser.role", function () {

        let userrole = this.get("loggedinUser.role");
        if (userrole != "Administrator") {
            return moment().startOf('isoWeek').format("YYYY-MM-DD");
        }

    }),
    maxDateForLogging: computed("loggedinUser.role", function () {
        return moment().format("YYYY-MM-DD");
    }),

    today: computed("", function () {
        return moment().format("YYYY-MM-DD");
    }),


    clearform() {
        $("#frmSubmitTimeEntry")[0].reset();
        $("#dateofwork")[0].value = this.get("today");
        this.set('isFormSubmitted', "");
        this.set('taskhours', 0);
        this.set("isTangible", true);
        this.set('taskminutes', 0);

    },

    validateform() {
        this.set('isFormSubmitted', "submitted");
        let form = $("#frmSubmitTimeEntry").get(0);
        return form.checkValidity();
    },

    actions: {
        clearform() {
            this.clearform();

        },
        submitTimeEntry() {
            let toastr = this.get('toast');


            if (this.validateform()) {

                let timeentry = {};

                let hours = (this.get('taskhours')) ? this.get('taskhours') : "00";
                let minutes = (this.get('taskminutes')) ? this.get('taskminutes') : "00";

                let timespent = hours + ":" + minutes;
                let dateofWork = (this.get('dateofWork')) ? moment(this.get('dateofWork')).format() : moment().format();
                timeentry.personId = this.get('forUserId');
                timeentry.projectId = this.get('forprojectId');
                timeentry.dateofWork = dateofWork;
                timeentry.timeSpent = timespent;
                timeentry.isTangible = this.get('isTangible');
                timeentry.notes = this.get('notes');
                this.get('timeEntryService').postTimeEntry(timeentry)
                    .then(results => {
                        toastr.success("", 'Time Entry Saved');
                        this.get("notifyController")(Date.now());
                        this.clearform();
                        $("[data-dismiss=modal]").trigger({ type: "click" });
                    }, error => {
                        toastr.warning(error.responseJSON.message, 'Error!!');
                    });


            }
            else {
                alert("Please fix the form values");
            }
        }

    }

});
