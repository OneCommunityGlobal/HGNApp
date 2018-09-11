import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formatDatetime(params) {
  let value = params[0];
  
  return moment(value).local().format("YYYY-MM-DD");
}

export default helper(formatDatetime);
