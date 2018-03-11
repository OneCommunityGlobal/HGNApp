
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
    newactionitem: null,
    addnewactionitem: false,
    dataService: inject('datastore-service'),
    userProfileService: inject('user-profile-service'),

    forUser: null,
    newAIdescription: null,
    newdescription: null,

    init() {

        this._super(...arguments);

        let user =
            { "requestorId": this.get('forUserId') }


        this.get('userProfileService').getTeamMembers(user)
            .then(results => { this.set('teamMembers', results); });

        this.get('dataService').getActionItems(user)
            .then(results => { this.set('actionItems', results); });
    },
    isEditable: computed('loggedinUser', 'forUserId', function () {

        let loggedinUser = this.get("loggedinUser.requestorId");
        let forUserId = this.get('forUserId');
        return (loggedinUser === forUserId);

    }),


    actions: {

        getActionItemsForUser() {

            let requestor = { "requestorId": this.get('forUser') };
            this.get('dataService').getActionItems(requestor)
                .then(results => {
                    this.set('actionItems', results);
                });
        },

        editActionItem(actionItem) {
            let editedactionitem = {};

            editedactionitem._id = actionItem._id;
            editedactionitem.description = this.get('newdescription');
            editedactionitem.assignedTo = actionItem.assignedTo;
            editedactionitem.createdBy = actionItem.createdBy;


            this.get('dataService').editActionItem(editedactionitem);


        },
        deleteActionItem(actionItem) {



            this.get('actionItems').removeObject(actionItem);
            this.get('dataService').deleteActionItem(actionItem);

        },

        createActionItem() {
            let newActionItem = {};

            let assignedTo = this.get('forUser');

            if (!assignedTo) {
                assignedTo = this.get('loggedinUser.requestorId');
            }

            newActionItem.assignedTo = assignedTo;
            newActionItem.description = this.get('newAIdescription');

            this.get('dataService').createActionItem(newActionItem)
                .then(result => {
                    this.get('actionItems').addObject(result);
                    this.set('newAIdescription', "");
                });

        },
        showForm() {
            this.set('addnewactionitem', true);
        },
        selectAssignee(assignee) {
            this.set('newactionitem.assignedTo', assignee._id);

        }

    }

});
