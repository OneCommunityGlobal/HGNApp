
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';



export default Controller.extend({
    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        alert(userrole)
        return (userrole === "Administrator");
        //return true;

    }),
    projectService: inject('project-service'),
    userProfileService: inject('user-profile-service'),
    minProjectName: "2",
    maxProjectName: "100",
    newProject: {
        projectName: "",
        isActive: true
    },
    projectmembers: [],
    allUsers: [],

    getProjectMembers: function (project) {
        this.get('projectService').getProjectMembers(project._id)
            .then(results => {
                this.set("projectmembers", results);
                this.set("currentProject", project.projectName);

            })
    },

    allUsers: computed("userrole", function () {
        let userrole = this.get('userrole');
        if (userrole == "Administrator") {
            return this.get('userProfileService').getAllUserProfiles()
            // .then(results => { return results });

        }
        else {
            return [];
        }


    }),
    actions: {

        addNewProject() {

            let newProjectform = $("#frmNewProject")[0];
            this.set("isFormsubmitted", "submitted");

            let project = this.get("newProject");

            if (newProjectform.checkValidity()) {
                this.get('projectService').postProject(project)
                    .then((results) => {
                        toastr.success("", 'New Project Created!');
                        this.set("isFormsubmitted", "");
                        newProjectform.reset();
                        this.get("model").addObject(results);
                        $("[data-dismiss=modal]").trigger({ type: "click" });
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
        showusersforproject(project) {
            this.getProjectMembers(project);
        },
        editmembersforprojects(project) {
            this.getProjectMembers(project);
        }
    }

});
