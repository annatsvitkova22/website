import { useState, useEffect } from 'react';

const useCfFilterHook = (type, cfsData, date) => {
  const [data, setData] = useState(cfsData);

  const actualDate = new Date().getTime();

  useEffect(() => {
    if (type === 'collecting') {
      setData(() => {
        console.log(JSON.stringify(type));
        return cfsData.filter((item) => {
          return new Date(item.date).getTime() > actualDate;
        });
      });
    }
    if (type === 'raised') {
      setData(() => {
        return cfsData.filter((item) => {
          return new Date(item.date).getTime() < actualDate;
        });
      });
    }
    if (type === 'implemented') {
      setData(() => {
        return cfsData.filter((item) => {
          return new Date(item.date).getDate() === date.getDate();
        });
      });
    }
  }, [type, date]);
  return {
    data,
  };
};

export default useCfFilterHook;
