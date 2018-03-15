
import Component from '@ember/component';


export default Component.extend({

  tagName: "card",
  classNames: ["card", "text-center", "mb-3", "w-33", "h-100", "hgn-profilebox", "pre-scrollable"],

  actions:
    {
      gotoMyProfile: function () {
        this.get('MyProfile');
      }
    }

});
