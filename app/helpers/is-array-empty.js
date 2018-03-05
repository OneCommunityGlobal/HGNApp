import Ember from 'ember';

export function isArrayEmpty([myarray, ...rest]) {
  return (myarray.length == 0 || !myarray)

}

export default Ember.Helper.helper(isArrayEmpty);
