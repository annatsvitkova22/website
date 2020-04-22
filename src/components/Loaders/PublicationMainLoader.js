import React from 'react';
import ContentLoader from 'react-content-loader';

const PublicationMainLoader = () => {
  return (
    <div className={'container'}>
      <ContentLoader
        viewBox={'0 0 1320 705'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect
          x={'200'}
          y={'455'}
          rx={'0'}
          rx={'0'}
          width={'921'}
          height={`15`}
        />
        <rect
          x={'200'}
          y={'475'}
          rx={'0'}
          rx={'0'}
          width={'921'}
          height={`20`}
        />
        <rect
          x={'200'}
          y={'500'}
          rx={'0'}
          rx={'0'}
          width={'921'}
          height={`20`}
        />
        <rect
          x={'200'}
          y={'525'}
          rx={'0'}
          rx={'0'}
          width={'921'}
          height={`10`}
        />
        <rect
          x={'200'}
          y={'540'}
          rx={'0'}
          rx={'0'}
          width={'921'}
          height={`10`}
        />
      </ContentLoader>
    </div>
  );
};

export default PublicationMainLoader;
