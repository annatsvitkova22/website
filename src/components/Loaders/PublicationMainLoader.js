import React from 'react';
import ContentLoader from 'react-content-loader';

const PublicationMainLoader = () => {
  return (
    <div className={'container'}>
      <ContentLoader
        viewBox={'0 0 1320 705'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'200'} y={'455'} width={'921'} height={`15`} />
        <rect x={'200'} y={'475'} width={'921'} height={`20`} />
        <rect x={'200'} y={'500'} width={'921'} height={`20`} />
        <rect x={'200'} y={'525'} width={'921'} height={`10`} />
        <rect x={'200'} y={'540'} width={'921'} height={`10`} />
      </ContentLoader>
    </div>
  );
};

export default PublicationMainLoader;
