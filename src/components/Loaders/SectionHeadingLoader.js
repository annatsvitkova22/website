import React from 'react';
import ContentLoader from 'react-content-loader';

const SectionHeadingLoader = () => {
  return (
    <div className="container">
      <ContentLoader viewBox={'0 0 1320 30'}>
        <rect x={'0'} y={'0'} width={'93'} height={`17`} />
        <rect x={'1227'} y={'0'} width={'100'} height={`17`} />
      </ContentLoader>
    </div>
  );
};

export default SectionHeadingLoader;
