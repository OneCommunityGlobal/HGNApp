
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({

    isArrayEmptyText: computed('userteams.[]', function () {
        let _teams = this.get('userteams');
        return (_teams && _teams.length > 0) ? "" : "No Team Memberships defined";
    }),
    allTeams: "",
    dataService: inject("datastore-service"),
    opsarray: [],

    notifyparent: function () {
        let key = this.get('name');
        let value = this.get('userteams');
        this.sendAction("onchangeaction", key, value);
    },

    actions:
        {
            removeTeamMembership(team) {
                var result = confirm("Are you sure you want to delete membership to this team?");
                if (result) {
                    this.get('userteams').removeObject(team);
                    this.notifyparent();
                }
            },
            loadAllTeams() {

                return this.get('dataService').getAllTeams()
                    .then(results => {
                        this.set("allTeams", results);
                    })

            },
            cancelAction() {
                this.set('opsarray', []);

            },
            manageTeamMemberships() {

                let ops = this.get('opsarray');

                for (let i = 0; i < ops.length; i++) {
                    let op = ops[i];
                    if (op.action === "remove") {
                        let _team = this.get('userteams').findBy('_id', op._id);
                        if (_team) { this.get('userteams').removeObject(_team); }
                    }
                    else {

                        let _team = { _id: op._id, teamName: op.teamName };
                        this.get('userteams').addObject(_team);
                    }
                }
                this.set('opsarray', []);
                this.notifyparent();

            },
            edituserteams(team) {

                let targetid = team._id;
                let targetname = team.teamName

                let op = (event.target.checked) ? { _id: targetid, teamName: targetname, action: "add" } : { _id: targetid, action: "remove" }
                this.get('opsarray').push(op);
            }
        }
});
