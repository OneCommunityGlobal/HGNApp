
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
                let title = this.get("title");
                $("[data-dismiss=modal]").trigger({ type: "click" });
                this.notifyparent();

            },
            editUserMembership(membership) {

                if (event.target.checked) {
                    this.get('memberships').addObject(membership);

                }
                else {
                    let record = this.get('memberships').findBy("_id", membership._id)
                    if (record) {
                        this.get('memberships').removeObject(record);
                    }
                }

            }
        }
});
