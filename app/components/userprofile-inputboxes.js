
import Component from '@ember/component';

export default Component.extend({
    actions: {
        notifyChange() {
            let key = this.get("name");
            let value = event.target.value;
            this.get("onchangeaction")(key, value);
        }
    }
});
