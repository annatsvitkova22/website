function convertISO8601ToTime(input) {
  const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  if (reptms.test(input)) {
    const matches = reptms.exec(input);
    let [, ...time] = matches;
    time = time.filter((el) => el !== undefined);
    const formattedTime = time.map((item) =>
      item.length === 2 ? `${item}` : `0${item}`
    );
    return formattedTime.join(':');
  }
  return '';
}

export default convertISO8601ToTime;
