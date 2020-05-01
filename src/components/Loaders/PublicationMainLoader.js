import React from 'react';
import ContentLoader from 'react-content-loader';

const PublicationMainLoader = () => {
  return (
    <div className={'container'}>
      <ContentLoader
        viewBox={'0 0 1320 1205'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'50'} width={'1320'} height={`700`} />

        <rect x={'0'} y={'790'} width={'1320'} height={`20`} />

        <rect x={'0'} y={'820'} width={'650'} height={`600`} />
        <rect x={'670'} y={'820'} width={'650'} height={`600`} />
      </ContentLoader>
    </div>
  );
};

export default PublicationMainLoader;
