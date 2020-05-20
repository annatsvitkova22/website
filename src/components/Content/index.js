import React from 'react';
import PropTypes from 'prop-types';

import Paragraph from '../Gutenberg/Paragraph';
import Image from '../Gutenberg/Image';
import Audio from '../Gutenberg/Audio';
import Youtube from '../Gutenberg/Youtube';
import File from '../Gutenberg/File';
import Heading from '../Gutenberg/Heading';
import List from '../Gutenberg/List';
import Quote from '../Gutenberg/Quote';
import Soundcloud from '../Gutenberg/Soundcloud';
import Gallery from '../Gutenberg/Gallery';
import Cover from '../Gutenberg/Cover';
import Table from '../Gutenberg/Table';
import Button from '../Gutenberg/Button';
import Archives from '../Gutenberg/Archives';
import Columns from '../Gutenberg/Columns';
import Pullquote from '../Gutenberg/Pullquote';
import TagCloud from '../Gutenberg/TagCloud';
import Categories from '../Gutenberg/Categories';
import Separator from '../Gutenberg/Separator';
import FreeForm from '../Gutenberg/FreeForm';
import Spacer from '../Gutenberg/Space';
import MediaText from '../Gutenberg/MediaText';
import Vimeo from '../Gutenberg/Vimeo';

import Buttons from '~/components/Gutenberg/Buttons';
import Form from '~/components/Form';
import Verse from '~/components/Gutenberg/Verse';
import Instagram from '~/components/Gutenberg/Instagram';
import Facebook from '~/components/Gutenberg/Facebook';
import Twitter from '~/components/Gutenberg/Twitter';

const Content = ({ content, className = '' }) => {
  // TODO: add & test all content types listed in this log

  return (
    <>
      {content && typeof content !== 'string' ? (
        content.map((block, index) =>
          getContentType({ block, index, className })
        )
      ) : (
        <FreeForm
          className={`${className} gutenberg__freeform-old`}
          block={content}
        />
      )}
    </>
  );
};

export const getContentType = ({ block, index, className }) => {
  if (block.__typename === 'CoreParagraphBlock') {
    return (
      <Paragraph
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreFreeformBlock') {
    return (
      <FreeForm
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreVerseBlock') {
    return (
      <Verse
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreEmbedVimeoBlock') {
    return (
      <Vimeo
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreEmbedTwitterBlock') {
    return (
      <Twitter
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreEmbedFacebookBlock') {
    return (
      <Facebook
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreEmbedInstagramBlock') {
    return (
      <Instagram
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreImageBlock') {
    return (
      <Image
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreAudioBlock') {
    return (
      <Audio
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreEmbedYoutubeBlock') {
    return (
      <Youtube
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreArchivesBlock') {
    return (
      <Archives
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreEmbedSoundcloudBlock') {
    return (
      <Soundcloud
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreHeadingBlock') {
    return (
      <Heading
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreGalleryBlock') {
    return (
      <Gallery
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreListBlock') {
    return (
      <List
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreQuoteBlock') {
    return (
      <Quote
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreCoverBlock') {
    return (
      <Cover
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'CoreFileBlock') {
    return (
      <File
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreTableBlock') {
    return (
      <Table
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreButtonBlock') {
    return (
      <Button
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreColumnsBlock') {
    return (
      <Columns
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreMediaTextBlock') {
    return (
      <MediaText
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CorePullquoteBlock') {
    return (
      <Pullquote
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }

  if (block.__typename === 'CoreTagCloudBlock') {
    return (
      <TagCloud
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreCategoriesBlock') {
    return (
      <Categories
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreSeparatorBlock') {
    return (
      <Separator
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }
  if (block.__typename === 'CoreSpacerBlock') {
    return (
      <Spacer
        block={block}
        key={`${block.__typename}-${index}`}
        className={className}
      />
    );
  }

  if (block.__typename === 'CoreButtonsBlock') {
    return (
      <Buttons
        className={className}
        block={block}
        key={`${block.__typename}-${index}`}
      />
    );
  }
  if (block.__typename === 'GravityformsFormBlock') {
    return (
      <Form id={block.attributes.formId} gutenbergType={block.__typename} />
    );
  }
  if (block.__typename === 'GravityformsPollsBlock') {
    return (
      <Form id={block.attributes.formId} gutenbergType={block.__typename} />
    );
  }
  return null;
};

Content.propTypes = {
  content: PropTypes.any,
  className: PropTypes.string,
};

export default Content;
