import { useState, useEffect } from 'react';

const useFilterHook = (type, eventsData, date) => {
  const [data, setData] = useState(eventsData);

  const actualDate = new Date().getTime();

  useEffect(() => {
    if (type === 'actual') {
      setData(() => {
        return eventsData.filter((item) => {
          return new Date(item.date).getTime() > actualDate;
        });
      });
    }
    if (type === 'finished') {
      setData(() => {
        return eventsData.filter((item) => {
          return new Date(item.date).getTime() < actualDate;
        });
      });
    }
    if (type === 'forDate') {
      setData(() => {
        return eventsData.filter((item) => {
          return new Date(item.date).getDate() === date.getDate();
        });
      });
    }
  }, [type, date]);
  return {
    data,
  };
};

export default useFilterHook;
