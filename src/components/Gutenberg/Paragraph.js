import React from 'react';
import PropTypes from 'prop-types';

import Image from '~/components/Gutenberg/Image';

const Paragraph = ({ block }) => {
  // TODO: implement all other attributes
  return <p dangerouslySetInnerHTML={{ __html: block.attributes.content }} />;
};

Image.propTypes = {
  block: PropTypes.any,
};

export default Paragraph;
