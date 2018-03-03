import Ember from 'ember';

export default Ember.Component.extend({
    submitModal: "",
    linksarray: "",
    newLink: {
        Name: "",
        Link: ""
    },

    isArrayEmptyText: Ember.computed('linksarray', function () {

        let text = "No link defined";

        let array = this.get('linksarray');
        return (array.length === 0) ? text : "";

    }),

    actions:
        {
            addLink() {

                this.set('submitModal', 'submitModal');

                let namefield = (Ember.$("#newLinkName").get())[0];
                let linkfield = (Ember.$("#newLinkLink").get())[0];

                alert(this.get("newLink.Name"));
                alert(this.get("newLink.Link"));
                let _newlink = this.get('newLink')

                if (namefield.validity.valid && linkfield.validity.valid) {
                    this.set('submitModal', '');
                    this.get('linksarray').addObject(_newlink);
                    this.notifyPropertyChange('linksarray');
                    let key = this.get('name');
                    let value = this.get('linksarray');
                    this.sendAction("onchangeaction", key, value);
                    this.set('newLink.Name', "");
                    this.set('newLink.Link', "");

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
                    this.notifyPropertyChange('linksarray');
                    let key = this.get('name');
                    let value = this.get('linksarray');
                    this.sendAction("onchangeaction", key, value);

                }
            },
        }
});
