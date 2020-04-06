import React from 'react';
import PropTypes from 'prop-types';

const NextPage = ({ block }) => {
  return <div dangerouslySetInnerHTML={{ __html: block.saveContent }} />;
};

NextPage.propTypes = {
  block: PropTypes.any,
};

export default NextPage;
