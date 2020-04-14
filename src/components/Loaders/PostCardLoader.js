import React from 'react';
import ContentLoader from 'react-content-loader';

const PostCardLoader = ({ type }) => {
  if (type === 'small') {
    return (
      <ContentLoader viewBox={'0 0 425 325'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'425'} height={`250`} />
        <rect x={'0'} y={'255'} rx={'0'} rx={'0'} width={'425'} height={`75`} />
      </ContentLoader>
    );
  }
  if (type === 'big') {
    return (
      <ContentLoader viewBox={'0 0 648 325'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'648'} height={`430`} />
      </ContentLoader>
    );
  }
  if (type === 'wide') {
    return (
      <ContentLoader viewBox={'0 0 1320 410'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'655'} height={`410`} />
        <rect
          x={'660'}
          y={'0'}
          rx={'0'}
          rx={'0'}
          width={'655'}
          height={`410`}
        />
      </ContentLoader>
    );
  }
  return null;
};

export default PostCardLoader;
