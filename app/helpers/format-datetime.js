import { helper } from '@ember/component/helper';
import moment from 'moment';

export function formatDatetime([date, ...params]) {
  
  return moment(date).local().format("YYYY-MM-DD");
}

export default helper(formatDatetime);
