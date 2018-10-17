import Component from '@ember/component';
import {get} from '@ember/object';
import layout from '../templates/components/delete-row-comp';


export default Component.extend({layout,

    click(){
        let onClick = get(this, "onClick");
        if (onClick) {
          onClick(get(this, "record"));
          event.stopPropagation();
          
        }
      }
});
