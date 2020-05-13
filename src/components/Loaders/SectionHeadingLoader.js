import React from 'react';
import ContentLoader from 'react-content-loader';

const SectionHeadingLoader = () => {
  return (
    <div className="container">
      <div className="row sec-heading line-height-1">
        <div className="col-12">
          <ContentLoader viewBox={'0 0 1320 16'}>
            <rect x={'0'} y={'0'} width={'93'} height={`16`} />
            <rect x={'1227'} y={'0'} width={'100'} height={`16`} />
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

export default SectionHeadingLoader;
