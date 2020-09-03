import React from 'react';
import ContentLoader from 'react-content-loader';

const VideosCategoryPageLoader = () => {
  return (
    <div className={'container'}>
      <ContentLoader
        viewBox={'0 0 1320 200'}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
      >
        <rect x={'0'} y={'0'} width={'600'} height={`80`} />

        <rect x={'0'} y={'120'} width={'400'} height={`30`} />
      </ContentLoader>
    </div>
  );
};

export default VideosCategoryPageLoader;
