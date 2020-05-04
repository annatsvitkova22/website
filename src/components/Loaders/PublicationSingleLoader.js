import React from 'react';
import ContentLoader from 'react-content-loader';

const PublicationSingleLoader = () => {
  return (
    <div>
      <ContentLoader
        viewBox={'0 0 1300 1100'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'0'} width={'1300'} height={`500`} />
        <rect x={'250'} y={'550'} width={'800'} height={`500`} />
      </ContentLoader>
    </div>
  );
};

export default PublicationSingleLoader;
