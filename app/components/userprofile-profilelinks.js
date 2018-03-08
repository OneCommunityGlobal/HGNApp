import Ember from 'ember';

export default Ember.Component.extend({
    submitModal: "",
    name: "",
    linksarray: "",
    newLink: {
        Name: "",
        Link: ""
    },

    isArrayEmptyText: Ember.computed('linksarray.[]', function () {

        let text = "No link defined";

        let array = this.get('linksarray');
        return (array && array.length > 0) ? "" : text;

    }),

    notifyparent: function () {
        let key = this.get('name');
        let value = this.get('linksarray');
        this.sendAction("onchangeaction", key, value);
    },

    actions:
        {
            addLink() {
                let namefield = (Ember.$("#newLinkName").get())[0];
                let linkfield = (Ember.$("#newLinkLink").get())[0];
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

            CancelAddingLink() {
                this.set('submitModal', '')
                this.set('newLink.Name', "");
                this.set('newLink.Link', "");
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
