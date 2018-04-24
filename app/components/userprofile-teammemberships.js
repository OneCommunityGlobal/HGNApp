
import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object'

export default Component.extend({
    tagName: "card",
    classNames: ["card", "border-primary", "w-100", "mb-3"],

    isArrayEmptyText: computed('memberships.[]', function () {
        let memberships = this.get('memberships');
        return (memberships && memberships.length > 0) ? "" : `No ${this.get("title")} Memberships defined`;
    }),
    allTeams: "",
    dataService: inject("datastore-service"),
    projectService: inject('project-service'),
    opsarray: [],

    notifyparent: function () {
        let key = this.get('name');
        let value = this.get('memberships');
        this.get("onchangeaction")(key, value);
    },

    actions:
        {
            removeMembership(membership) {
                var result = confirm("Are you sure you want to delete this membership?");
                if (result) {
                    this.get('memberships').removeObject(membership);
                    this.notifyparent();
                }
            },
            loadAllmemberships() {

                if (this.get("name") === "teams") {
                    return this.get('dataService').getAllTeams()
                        .then(results => {
                            this.set("allMemberships", results);
                        })
                }
                else {
                    return this.get('projectService').getAllProjects()
                        .then(results => {
                            this.set("allMemberships", results);
                        })

                }

            },
            cancelAction() {
                this.set('opsarray', []);

            },
            manageMemberships() {
                let ops = this.get('opsarray');

                for (let i = 0; i < ops.length; i++) {
                    let op = ops[i];
                    if (op.action === "remove") {
                        let _membership = this.get('memberships').findBy('_id', op._id);
                        if (_membership) { this.get('memberships').removeObject(_membership); }
                    }
                    else {

                        let _membership = (this.get("name") === "teams") ? { _id: op._id, teamName: op.teamName } : { _id: op._id, projectName: op.projectName };
                        this.get('memberships').addObject(_membership);
                    }
                }
                this.set('opsarray', []);
                this.notifyparent();

            },
            editUserMembership(membership) {

                let targetid = membership._id;
                let targetname = (this.get("name") === "teams") ? membership.teamName : membership.projectName;
                let op = {};

                if (this.get("name") === "teams") { op = (event.target.checked) ? { _id: targetid, teamName: targetname, action: "add" } : { _id: targetid, action: "remove" } }
                else {
                    op = (event.target.checked) ? { _id: targetid, projectName: targetname, action: "add" } : { _id: targetid, action: "remove" }

                }
                this.get('opsarray').push(op);
            }
        }
});
