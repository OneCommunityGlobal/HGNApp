
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';



export default Controller.extend({
    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        return (userrole === "Administrator");
    }),
    projectService: inject('project-service'),
    minProjectName: "2",
    maxProjectName: "100",
    newProject: {
        projectName: "",
        isActive: true
    },
    projectmembers: [],
    assignment_changes: [],
    editingform: false,

    modalName: computed("userrole", function () {
        let userrole = this.get('userrole');
        return (userrole === "Administrator") ? "editprojectmembersmodal" : "projectmembersmodal";

    }),
    getProjectMembers: function (project) {
        this.set("projectmembers", []);
        this.get('projectService').getProjectMembers(project._id)
            .then(results => {
                this.set("projectmembers", results);
                this.set("currentProjectName", project.projectName);
                this.set("currentProjectId", project._id);
            })
    },

    resetForm() {
        this.set("assignment_changes", []);
        this.set("editingform", false);
        this.set("projectmembers", []);
        this.set("currentProjectId", "");
        this.set("currentProjectName", "");
        $(".form-check-input").prop("checked", false);
    },


    actions: {
        resetForm() {
            this.resetForm();
        },

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
                        this.get("model.allProjects").addObject(results);
                        $("#modalNewProject").find(".close")[0].click();
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
                        this.get("model.allProjects").removeObject(project);
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
        getusersforproject(project) {
            this.getProjectMembers(project);
        },


        editProjectMembership(user) {
            var entry = (event.target.checked) ? { userId: user._id, operation: "Assign" } : { userId: user._id, operation: "Unassign" };
            this.get("assignment_changes").addObject(entry);
            this.set("editingform", true);
        },

        savemembershipchanges() {
            let memberships = this.get("assignment_changes");
            let projectId = this.get("currentProjectId");
            this.get('projectService').manageProjectMembers(projectId, { "users": memberships })
                .then(results => {
                    toastr.success("", 'Membership updated');
                    $("#editprojectmembersmodal").find(".close")[0].click();
                }, error => {
                    toastr.error("", error);
                });
        },

        selectallusers() {
            $(".form-check-input").prop("checked", true);
            this.set("editingform", true);
            let allusers = this.get("model.allUsers");
            allusers.forEach(element => {
                var entry = { userId: element._id, operation: "Assign" };
                this.get("assignment_changes").addObject(entry);

            })

        },

        unselectallusers() {
            $(".form-check-input").prop("checked", false);
            this.set("editingform", true);
            let allusers = this.get("model.allUsers");
            allusers.forEach(element => {
                var entry = { userId: element._id, operation: "Unassign" };
                this.get("assignment_changes").addObject(entry);

            })

        }
    }

});
