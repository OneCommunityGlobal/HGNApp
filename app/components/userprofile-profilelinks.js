
import Component from '@ember/component';
import { computed } from '@ember/object'
import $ from 'jquery';

export default Component.extend({
    tagName: "card",
    classNames: ["card", "border-secondary", "w-100", "mb-3"],
    submitModal: "",
    name: "",
    linksarray: "",
    init() {
        this._super(...arguments);
        let newLink = {
            Name: "",
            Link: ""
        }
        this.set('newLink', newLink);
    },

    isArrayEmptyText: computed('linksarray.[]', function () {

        let text = "No link defined";

        let array = this.get('linksarray');
        return (array && array.length > 0) ? "" : text;

    }),

    notifyparent: function () {
        let key = this.get('name');
        let value = this.get('linksarray');
        this.get("onchangeaction")(key, value);
    },

    actions:
        {
            addLink() {
                this.set("isFormSubmitted", "submitted");
                let name = this.get('name');

                let form = $(`#formnew${name}`)[0];

                this.set('submitModal', 'submitModal');

                let _newlink = {

                    Name: this.get('newLink.Name'),
                    Link: this.get('newLink.Link')
                };

                if (form.checkValidity()) {
                    this.set('submitModal', '');
                    this.get('linksarray').addObject(_newlink);
                    this.set('newLink.Name', "");
                    this.set('newLink.Link', "");
                    this.set("isFormSubmitted", "");
                    form.reset();
                    this.notifyparent();

                }

            },
            editlinksarray(index) {
                let value = event.target.value;
                let record = this.get('linksarray').objectAt(index);
                Ember.set(record, 'Link', value);
                this.notifyparent();

            },

            cancelAddingLink() {
                this.set('submitModal', '')
                let name = this.get('name');
                let form = $(`#formnew${name}`)[0];
                form.reset();
            },


            removeLink(link) {
                var result = confirm("Are you sure you want to remove this link?")
                if (result) {
                    this.get('linksarray').removeObject(link);
                    this.notifyparent();

                }
            },
        }
});
