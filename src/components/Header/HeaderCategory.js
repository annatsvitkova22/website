import React from 'react';
import PropTypes from 'prop-types';

const HeaderCategory = ({ className = '' }) => {
  return (
    <a href={'#'} className={`${className} category`}>
      !Коронавірус
    </a>
  );
};
HeaderCategory.propTypes = {
  className: PropTypes.string,
};
export default HeaderCategory;
