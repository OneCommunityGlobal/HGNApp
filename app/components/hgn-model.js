
import Component from '@ember/component';

export default Component.extend({

  actions: {
    doSave(d) {
      //d.reject();
      d.resolve();
    },
    doAfterClose() {
      //
    },
    doClose(d) {
      //  if(confirm('Please confirm...')) {


      if (true) {
        d.resolve();
      } else {
        d.reject();
      }
    }
  }

});
