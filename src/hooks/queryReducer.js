const queryReducer = (queryState, actionType, name, value) => {
  switch (actionType) {
    case 'change':
    case 'change-field':
    case 'select-option':
      return { ...queryState, [name]: value };
    case 'clear':
      return Object.entries({ ...queryState, [name]: value }).reduce(
        (a, [k, v]) => {
          return v === '' ? a : { ...a, [k]: v };
        },
        {}
      );

    default:
      return queryState;
  }
};

export default queryReducer;
