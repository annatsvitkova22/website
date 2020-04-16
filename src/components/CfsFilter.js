import React from 'react';
import PropTypes from 'prop-types';

const CfsFilter = (props) => {
  const { cfFilter } = props;
  return (
    <>
      <li className="justify-content-around">
        <button onClick={cfFilter} name="collecting">
          Йде збір
        </button>
      </li>
      <li className="justify-content-around">
        <button onClick={cfFilter} name="raised">
          Кошти зібрано
        </button>
      </li>
      <li className="justify-content-around">
        <button onClick={cfFilter} name="implemented">
          Реалізовано
        </button>
      </li>
    </>
  );
};

CfsFilter.propTypes = {
  cfFilter: PropTypes.any,
};

export default CfsFilter;
