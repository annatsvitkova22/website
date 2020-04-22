import React from 'react';
import ContentLoader from 'react-content-loader';

const PostCardLoader = ({ type }) => {
  if (type === 'small') {
    return (
      <ContentLoader viewBox={'0 0 425 410'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'425'} height={`250`} />
        <rect x={'0'} y={'255'} rx={'0'} rx={'0'} width={'60'} height={`15`} />
        <rect x={'0'} y={'275'} rx={'0'} rx={'0'} width={'425'} height={`10`} />
        <rect x={'0'} y={'290'} rx={'0'} rx={'0'} width={'425'} height={`10`} />
        <rect x={'0'} y={'305'} rx={'0'} rx={'0'} width={'425'} height={`10`} />
        <rect x={'0'} y={'320'} rx={'0'} rx={'0'} width={'425'} height={`5`} />
      </ContentLoader>
    );
  }
  if (type === 'big') {
    return (
      <ContentLoader
        viewBox={'0 0 648 430'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'270'} rx={'0'} rx={'0'} width={'60'} height={`15`} />
        <rect x={'0'} y={'300'} rx={'0'} rx={'0'} width={'600'} height={`15`} />
        <rect x={'0'} y={'320'} rx={'0'} rx={'0'} width={'600'} height={`15`} />
        <rect x={'0'} y={'345'} rx={'0'} rx={'0'} width={'60'} height={`5`} />
      </ContentLoader>
    );
  }
  if (type === 'wide') {
    return (
      <ContentLoader viewBox={'0 0 1320 410'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'660'} height={`410`} />
        <rect
          x={'708'}
          y={'100'}
          rx={'0'}
          rx={'0'}
          width={'65'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'140'}
          rx={'0'}
          rx={'0'}
          width={'560'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'160'}
          rx={'0'}
          rx={'0'}
          width={'560'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'180'}
          rx={'0'}
          rx={'0'}
          width={'560'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'200'}
          rx={'0'}
          rx={'0'}
          width={'560'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'220'}
          rx={'0'}
          rx={'0'}
          width={'560'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'240'}
          rx={'0'}
          rx={'0'}
          width={'560'}
          height={`15`}
        />
        <rect
          x={'708'}
          y={'280'}
          rx={'0'}
          rx={'0'}
          width={'65'}
          height={`15`}
        />
      </ContentLoader>
    );
  }
  return null;
};

export default PostCardLoader;
