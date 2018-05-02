import { helper } from '@ember/component/helper';
import moment from 'moment';

export function isTimeentryWithinWeek(params) {

  let dateofwork = params[0];
  let dow = moment(dateofwork).local();
  let now = moment();
  let duration = now.diff(dow, "days");

  let result = (duration <= 7);

  return result;
}

export default helper(isTimeentryWithinWeek);
