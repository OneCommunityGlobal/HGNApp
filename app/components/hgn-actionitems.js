
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    newactionitem: null,
    dataService: inject('datastore-service'),
    userProfileService: inject('user-profile-service'),
    forUser: null,
    newAIdescription: null,
    teamMembers: [],
    toast: inject('toast'),

    didReceiveAttrs() {

        this._super(...arguments);

        this.set('forUser', this.get('forUserId'));

        let user =
            { "requestorId": this.get('forUserId') }
        this.get('userProfileService').getTeamMembers(user)
            .then(results => { this.set('teamMembers', results.myteam); });

        this.get('dataService').getActionItems(user)
            .then(results => { this.set('actionItems', results); })
    },
    isEditable: computed('loggedinUser', 'forUserId', 'forUser', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('forUserId');
        let forUser = this.get('forUser');
        if (forUser) {
            return (loggedinUser === forUserId && loggedinUser === forUser);
        }
        else {
            return (loggedinUser === forUserId);
        }

    }),
    nameofUserForWhomActionItemsAreBeingViewed: computed("forUser", "teamMembers", function () {

        let teamMembers = this.get("teamMembers");
        let forUser = this.get("forUser");
        let name = "";
        teamMembers.forEach(element => {
            if (forUser === element._id) {
                name = element.name;
            }
        });
        return name;
    }),


    isUseronSelfPage: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('forUserId');
        return (loggedinUser === forUserId);
    }),

    actions: {

        getActionItemsForUser() {

            let requestedfor = { "requestorId": this.get('forUser') };
            let loggedinUser = this.get("loggedinUser.requestorId");

            this.get('dataService').getActionItems(requestedfor)
                .then(results => {
                    this.set('actionItems', results);

                });
        },

        editActionItem(actionItem, index) {

            let inputfield = $(`#input_actionitem_${index}`).get(0);
            this.set("isSubmitted", "submitted")

            if (inputfield.checkValidity()) {
                this.set('isSubmitted', "");
                this.get('dataService').editActionItem(actionItem);
            }


        },
        deleteActionItem(actionItem) {
            if (confirm("Are you sure you want to delete this action item?")) {

                this.get('actionItems').removeObject(actionItem);
                this.get('dataService').deleteActionItem(actionItem)
                    .then(results => {
                        let toastr = this.get("toast");
                        toastr.success("Deleted successfully");
                    })
            }

        },

        createActionItem() {

            let form = $("#frmnewactionitem").get(0);
            this.set('isFormSumbitted', "submitted");

            if (form.checkValidity()) {
                let newActionItem = {};
                let toastr = this.get("toast");
                let assignedTo = this.get('forUser');

                newActionItem.assignedTo = assignedTo;
                newActionItem.description = this.get('newAIdescription');

                this.get('dataService').createActionItem(newActionItem)
                    .then(result => {
                        this.get('actionItems').addObject(result);
                        this.set('isFormSumbitted', "");
                        $("#frmnewactionitem")[0].reset();

                        toastr.success("Action item sucessfully created");


                    });
            }

        }

    }



});
