import React from 'react';

import Paragraph from './Gutenberg/Paragraph';

const Content = ({ content }) => {
  console.log(content);
  return (
    <>
      {content.map((block) => {
        if (block.name === 'core/paragraph') {
          return <Paragraph block={block} />;
        }
      })}
    </>
  );
};

export default Content;
