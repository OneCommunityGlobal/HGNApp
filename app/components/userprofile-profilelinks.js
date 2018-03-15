
import Component from '@ember/component';
import { computed } from '@ember/object'
import $ from 'jquery';

export default Component.extend({
    tagName: "card",
    classNames: ["card", "card-outline-success", "w-50"],
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
                let namefield = ($("#newLinkName").get())[0];
                let linkfield = ($("#newLinkLink").get())[0];
                this.set('submitModal', 'submitModal');

                let _newlink = {

                    Name: this.get('newLink.Name'),
                    Link: this.get('newLink.Link')
                };

                if (namefield.validity.valid && linkfield.validity.valid) {
                    this.set('submitModal', '');
                    this.get('linksarray').addObject(_newlink);
                    this.set('newLink.Name', "");
                    this.set('newLink.Link', "");
                    this.notifyparent();

                }

            },
            editlinksarray(index) {
                let value = event.target.value;
                let record = this.get('linksarray').objectAt(index);
                Ember.set(record, 'Link', value);
                this.notifyparent();

            },

            CancelAddingLink() {
                this.set('submitModal', '')
                let formid = `formnew${this.get('name')}`;
                $(`#${formid}`)[0].reset();
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
