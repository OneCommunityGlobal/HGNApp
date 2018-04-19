
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';



export default Controller.extend({
    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        //return userrole === "Administrator" ? true : false;
        return true;

    }),
    projectService: inject('project-service'),
    minProjectName: "2",
    maxProjectName: "100",
    newProject: {
        projectName: "",
        isActive: true
    },


    actions: {

        addNewProject() {
            let newProjectform = $("#frmNewProject")[0];
            this.set("isFormsubmitted", "submitted");

            let project = this.get("newProject");

            if (newProjectform.checkValidity()) {
                this.get('projectService').postProject(project)
                    .then((results) => {
                        toastr.success("", 'New Project Created!');
                        this.set('newProject', {
                            projectName: "",
                            isActive: true
                        });
                        this.set("isFormsubmitted", "");
                        newProjectform.reset();
                        this.get("model").addObject(results);

                    },
                        error => { toastr.error(error.responseJSON.error) }
                    );

            }
            else {
                toastr.error("Please fix the form errors.")

            }

        },

        resetform() {
            let newProjectform = $("#frmNewProject")[0];
            this.set("isFormsubmitted", "")
            newProjectform.reset();
        },

        deleteProject(project) {

            this.get('projectService').deleteProject(project._id)
                .then(
                    results => {
                        toastr.success('Project Removed!')
                        this.get("model").removeObject(project);
                    },
                    error => {
                        toastr.warning(error.responseJSON.error);
                    }

                );

        },
        saveEdits(project, index) {

            let projectnamefield = $(`#projectname_${index}`)[0];

            if (projectnamefield.checkValidity()) {
                this.get('projectService').editProjectData(project, project._id)
                    .then(results => {
                        toastr.success("", 'Changes Saved');
                    },
                        error => { toastr.error(error.responseJSON.error) }
                    );
            }
            else {

                toastr.error("Project name is a mandatory field. Please fix the erorrs before saving the changes.")

            }


        },
    }

});
