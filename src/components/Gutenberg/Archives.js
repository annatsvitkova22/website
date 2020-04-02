import React from 'react';
import PropTypes from 'prop-types';

const Archives = ({ block }) => {
  if (block.attributes.displayAsDropdown) {
    return (
      <selection>
        <option>March</option>
        <option>April</option>
      </selection>
    );
  }
  return <div dangerouslySetInnerHTML={{ __html: block.renderedContent }} />;
};

Archives.propTypes = {
  block: PropTypes.any,
};

export default Archives;
