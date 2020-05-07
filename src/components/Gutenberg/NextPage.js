import React from 'react';
import PropTypes from 'prop-types';

const NextPage = ({ block, className = '' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.saveContent }}
      className={className}
    />
  );
};

NextPage.propTypes = {
  block: PropTypes.any,
  className: PropTypes.string,
};

export default NextPage;
