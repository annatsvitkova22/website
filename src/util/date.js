import * as moment from 'moment';

const dateToGraphQLQuery = (d) => {
  if (!d) return {};
  const date = moment(d);
  return {
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
  };
};

export default dateToGraphQLQuery;
