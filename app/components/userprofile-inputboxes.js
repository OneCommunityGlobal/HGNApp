import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        notifyChange() {
            let key = this.get("name");
            let value = event.target.value;
            this.sendAction("onchangeaction", key, value);
        }
    }
});
