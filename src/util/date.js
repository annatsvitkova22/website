import * as moment from 'moment';

export const dateToGraphQLQuery = (d) => {
  const date = moment(d);
  return {
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
  };
}
