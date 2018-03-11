
import Component from '@ember/component';

export default Component.extend({
    actions: {
        notifyChange() {
            let key = this.get("name");
            let value = event.target.value;
            this.sendAction("onchangeaction", key, value);
        }
    }
});
