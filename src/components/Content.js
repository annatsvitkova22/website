import React from 'react';

import Paragraph from './Gutenberg/Paragraph';
import Image from './Gutenberg/Image';

const Content = ({ content }) => {
  console.log(content);
  return (
    <>
      {content.map((block) => {
        if (block.__typename === 'CoreParagraphBlock') {
          return <Paragraph block={block} />;
        }
        if (block.__typename === 'CoreImageBlock') {
          return <Image block={block} />;
        }
      })}
    </>
  );
};

export default Content;
