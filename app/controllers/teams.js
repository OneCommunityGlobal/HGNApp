
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';



export default Controller.extend({
    isUserAdministrator: computed('userrole', function () {
        let userrole = this.get('userrole');
        return (userrole === "Administrator");
    }),
    teamService: inject('team-service'),
    minTeamName: "2",
    maxTeamName: "100",
    newTeam: {
        teamName: "",
        isActive: true
    },
    teamMembers: [],
    assignment_changes: [],
    editingform: false,

    modalName: computed("userrole", function () {
        let userrole = this.get('userrole');
        return (userrole === "Administrator") ? "editTeammembersmodal" : "teammembersmodal";

    }),
    getTeamMembers: function (team) {
        this.set("teammembers", []);
        this.get('teamService').getTeamMembers(team._id)
            .then(results => {
                this.set("teamMembers", results);
                this.set("currentTeamName", team.teamName);
                this.set("currentTeamId", team._id);
            })
    },

    resetForm() {
        this.set("assignment_changes", []);
        this.set("editingform", false);
        this.set("teamMembers", []);
        this.set("currentTeamId", "");
        this.set("currentTeamName", "");
        $(".form-check-input").prop("checked", false);
    },


    actions: {
        resetForm() {
            this.resetForm();
        },

        addNewTeam() {

            let newteamform = $("#frmNewTeam")[0];
            this.set("isFormsubmitted", "submitted");

            let team = this.get("newTeam");

            if (newteamform.checkValidity()) {
                this.get('teamService').postTeam(team)
                    .then((results) => {
                        toastr.success("", 'New team Created!');
                        this.get("model.allTeams").addObject(results);
                        this.set("isFormsubmitted", "");
                        newteamform.reset();
                        $("[data-dismiss=modal]").trigger({ type: "click" });
                    },
                        error => { toastr.error(error.responseJSON.error) }
                    );

            }
            else {
                toastr.error("Please fix the form errors.")

            }

        },
        resetNewTeamform() {
            let newteamform = $("#frmNewTeam")[0];
            this.set("isFormsubmitted", "")
            newteamform.reset();
        },

        deleteTeam(team) {

            this.get('teamService').deleteTeam(team._id)
                .then(
                    results => {
                        toastr.success('Team successfully deleted');
                        this.get("model.allTeams").removeObject(team);
                    },
                    error => {
                        toastr.warning(error.responseJSON.error);
                    }

                );

        },
        saveEdits(team, index) {

            let teamnamefield = $(`#teamname_${index}`)[0];

            if (teamnamefield.checkValidity()) {
                this.get('teamService').editTeamData(team, team._id)
                    .then(results => {
                        toastr.success("", 'Changes Saved');
                    },
                        error => { toastr.error(error.responseJSON.error) }
                    );
            }
            else {

                toastr.error("team name is a mandatory field. Please fix the erorrs before saving the changes.")

            }
        },
        getusersforTeam(team) {
            this.getTeamMembers(team);
        },


        editTeamMembership(user) {
            var entry = (event.target.checked) ? { userId: user._id, operation: "Assign" } : { userId: user._id, operation: "Unassign" };
            this.get("assignment_changes").addObject(entry);
            this.set("editingform", true);
        },

        savemembershipchanges() {
            let memberships = this.get("assignment_changes");
            let teamId = this.get("currentTeamId");
            this.get('teamService').manageTeamMembers(teamId, { "users": memberships })
                .then(results => {
                    toastr.success("", 'Membership updated');
                    this.set("editingform", false);
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
