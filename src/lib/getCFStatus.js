import * as moment from 'moment';

const getCFStatus = (post) => {
  const {
    cfACF: { expiration, tocollect, collected },
  } = post;
  const now = moment();
  const expiry = moment(expiration);
  const c = collected || 0;
  let status = null;
  if (expiry.isAfter(now)) {
    if (tocollect <= c) {
      status = 'finished';
    }
    if (tocollect > c) {
      status = 'active';
    }
  } else {
    if (tocollect <= c) {
      status = 'done';
    }
    if (tocollect > c) {
      status = 'expired';
    }
  }
  return status ? statuses.find((st) => st.value === status) : null;
};

export default getCFStatus;

const statuses = [
  {
    value: 'active',
    label: 'Триває Збір',
    color: 'orange',
  },
  {
    value: 'finished',
    label: 'Кошти Зібрані',
    color: 'blue',
  },
  {
    value: 'expired',
    label: 'Кошти Не Зібрані',
    color: 'red',
  },
  {
    value: 'done',
    label: 'Реалізовано',
    color: 'green',
  },
];
