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
import MediaText from '../Gutenberg/MediaText';
import Pullquote from '../Gutenberg/Pullquote';
import Calendar from '../Gutenberg/Calendar';
import TagCloud from '../Gutenberg/TagCloud';
import Categories from '../Gutenberg/Categories';
import LastComments from '../Gutenberg/LastComments';
import LatestPosts from '../Gutenberg/LatestPosts';
import Search from '../Gutenberg/Search';
import Separator from '../Gutenberg/Separator';
import FreeForm from '../Gutenberg/FreeForm';
import CodeBlock from '../Gutenberg/CodeBlock';
import More from '../Gutenberg/More';
import Spacer from '../Gutenberg/Space';
import NextPage from '../Gutenberg/NextPage';

import Buttons from '~/components/Gutenberg/Buttons';

const Content = ({ content, className = '' }) => {
  // TODO: add & test all content types listed in this log
  // console.log(content);

  return (
    <>
      {content &&
        content.map((block, index) => {
          if (block.__typename === 'CoreParagraphBlock') {
            return (
              <Paragraph
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
              <Archives block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreEmbedSoundcloudBlock') {
            return (
              <Soundcloud block={block} key={`${block.__typename}-${index}`} />
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
              <Gallery block={block} key={`${block.__typename}-${index}`} />
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
            return <Cover block={block} key={`${block.__typename}-${index}`} />;
          }
          if (block.__typename === 'CoreFileBlock') {
            return <File block={block} key={`${block.__typename}-${index}`} />;
          }
          if (block.__typename === 'CoreTableBlock') {
            return <Table block={block} key={`${block.__typename}-${index}`} />;
          }
          if (block.__typename === 'CoreButtonBlock') {
            return (
              <Button block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreColumnsBlock') {
            return (
              <Columns block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreMediaTextBlock') {
            return (
              <MediaText block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreMediaTextBlock') {
            return (
              <Pullquote block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CorePullquoteBlock') {
            return (
              <Pullquote block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreCalendarBlock') {
            return (
              <Calendar block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreTagCloudBlock') {
            return (
              <TagCloud block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreCategoriesBlock') {
            return (
              <Categories block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreLatestCommentsBlock') {
            return (
              <LastComments
                block={block}
                key={`${block.__typename}-${index}`}
              />
            );
          }
          if (block.__typename === 'CoreLatestPostsBlock') {
            return (
              <LatestPosts block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreSearchBlock') {
            return (
              <Search block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreCodeBlock') {
            return (
              <CodeBlock block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreFreeformBlock') {
            return (
              <FreeForm block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreMoreBlock') {
            return <More block={block} key={`${block.__typename}-${index}`} />;
          }
          if (block.__typename === 'CoreSeparatorBlock') {
            return (
              <Separator block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreSpacerBlock') {
            return (
              <Spacer block={block} key={`${block.__typename}-${index}`} />
            );
          }
          if (block.__typename === 'CoreNextpageBlock') {
            return (
              <NextPage block={block} key={`${block.__typename}-${index}`} />
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
          return null;
        })}
    </>
  );
};

Content.propTypes = {
  content: PropTypes.any,
};

export default Content;
