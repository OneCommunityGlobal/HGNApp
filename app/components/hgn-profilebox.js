
import Component from '@ember/component';


export default Component.extend({

  actions:
    {
      gotoMyProfile: function () {
        this.sendAction('MyProfile');
      }
    }

});
