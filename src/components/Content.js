import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from './Gutenberg/Paragraph';
import Image from './Gutenberg/Image';
import Audio from './Gutenberg/Audio';
import Youtube from './Gutenberg/Youtube';
import File from './Gutenberg/File';
import Heading from './Gutenberg/Heading';
import List from './Gutenberg/List';
import Quote from '~/components/Gutenberg/Quote';

const Content = ({ content }) => {
  // TODO: add & test all content types listed in this log
  console.log(content);
  return (
    <>
      {content.map((block, index) => {
        if (block.__typename === 'CoreParagraphBlock') {
          return (
            <Paragraph block={block} key={`${block.__typename}-${index}`} />
          );
        }
        if (block.__typename === 'CoreImageBlock') {
          return <Image block={block} key={`${block.__typename}-${index}`} />;
        }
        if (block.__typename === 'CoreAudioBlock') {
          return <Audio block={block} key={`${block.__typename}-${index}`} />;
        }
        if (block.__typename === 'CoreEmbedYoutubeBlock') {
          return <Youtube block={block} key={`${block.__typename}-${index}`} />;
        }
        if (block.__typename === 'CoreArchivesBlock') {
          return null;
        }
        if (block.__typename === 'CoreEmbedSoundcloudBlock') {
          return null;
        }
        if (block.__typename === 'CoreHeadingBlock') {
          return <Heading block={block} key={`${block.__typename}-${index}`} />;
        }
        if (block.__typename === 'CoreGalleryBlock') {
          return null;
        }
        if (block.__typename === 'CoreListBlock') {
          return <List block={block} key={`${block.__typename}-${index}`} />;
        }
        if (block.__typename === 'CoreQuoteBlock') {
          return <Quote block={block} key={`${block.__typename}-${index}`} />;
        }
        if (block.__typename === 'CoreCoverBlock') {
          return null;
        }
        if (block.__typename === 'CoreFileBlock') {
          return <File block={block} key={`${block.__typename}-${index}`} />;
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
