import { helper } from '@ember/component/helper';
import moment from 'moment';

export function isTimeentryWithinWeek(params/*, hash*/) {

  let dow = moment(params[0], "MM/DD/YYYY");
  let now = moment();
  let duration = now.diff(dow, "days");

  let result = (duration <= 7);
  return result;
}

export default helper(isTimeentryWithinWeek);
