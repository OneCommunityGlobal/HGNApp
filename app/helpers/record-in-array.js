import { helper } from '@ember/component/helper';

export function recordInArray(params) {
  let masterarray = params[0];
  let record = params[1];
  let fieldname = params[2];
  let result = false;

  masterarray.forEach(element => {

    if (element[fieldname] === record) {
      result = true;
      return;
    }

  });

  return result;
}

export default helper(recordInArray);
