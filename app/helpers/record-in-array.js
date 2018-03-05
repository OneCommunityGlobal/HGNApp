import Ember from 'ember';

export function recordInArray(params) {
  let masterarray = params[0];
  let record = params[1]._id;
  let result = false;

  masterarray.forEach(element => {

    if (element._id === record) {
      result = true;
      return;
    }

  });

  return result;
}

export default Ember.Helper.helper(recordInArray);
