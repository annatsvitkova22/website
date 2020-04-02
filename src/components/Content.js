import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from './Gutenberg/Paragraph';
import Image from './Gutenberg/Image';

const Content = ({ content }) => {
  // TODO: add & test all content types listed in this log
  console.log(content);
  return (
    <>
      {content &&
        content.map((block, index) => {
          if (block.__typename === 'CoreParagraphBlock') {
            return (
              <Paragraph block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreImageBlock') {
            return <Image block={block} key={`${block.__typename}-${index}`} />;
          }
          return null;
        })}
    </>
  );
};

Content.propTypes = {
  content: PropTypes.any,
};

export default Content;
