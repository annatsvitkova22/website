import React from 'react';
import ContentLoader from 'react-content-loader';

const VideoCategoryLoader = ({
  backgroundColor = '#333',
  foregroundColor = '#999',
  type,
}) => {
  if (type === 'mobile') {
    return (
      <ContentLoader
        viewBox={'0 0 335 318'}
        {...{ backgroundColor, foregroundColor }}
      >
        <rect x={'0'} y={'0'} width={'335'} height={`201`} />
        <rect x={'0'} y={'217'} width={'335'} height={`17`} />
        <rect x={'0'} y={'243'} width={'335'} height={`51`} />
      </ContentLoader>
    );
  }
  return (
    <div className="container">
      <ContentLoader
        viewBox={'0 0 1320 350'}
        {...{ backgroundColor, foregroundColor }}
      >
        <rect x={'0'} y={'0'} width={'312'} height={`190`} />
        <rect x={'0'} y={'205'} width={'30'} height={`17`} />
        <rect x={'0'} y={'225'} width={'312'} height={`15`} />
        <rect x={'0'} y={'245'} width={'312'} height={`15`} />
        <rect x={'0'} y={'265'} width={'312'} height={`15`} />
        <rect x={'0'} y={'285'} width={'312'} height={`15`} />

        <rect x={'336'} y={'0'} width={'312'} height={`190`} />
        <rect x={'336'} y={'205'} width={'30'} height={`17`} />
        <rect x={'336'} y={'225'} width={'312'} height={`15`} />
        <rect x={'336'} y={'245'} width={'312'} height={`15`} />
        <rect x={'336'} y={'265'} width={'312'} height={`15`} />
        <rect x={'336'} y={'285'} width={'312'} height={`15`} />

        <rect x={'672'} y={'0'} width={'312'} height={`190`} />
        <rect x={'672'} y={'205'} width={'30'} height={`17`} />
        <rect x={'672'} y={'225'} width={'312'} height={`15`} />
        <rect x={'672'} y={'245'} width={'312'} height={`15`} />
        <rect x={'672'} y={'265'} width={'312'} height={`15`} />
        <rect x={'672'} y={'285'} width={'312'} height={`15`} />

        <rect x={'1008'} y={'0'} width={'312'} height={`190`} />
        <rect x={'1008'} y={'205'} width={'30'} height={`17`} />
        <rect x={'1008'} y={'225'} width={'312'} height={`15`} />
        <rect x={'1008'} y={'245'} width={'312'} height={`15`} />
        <rect x={'1008'} y={'265'} width={'312'} height={`15`} />
        <rect x={'1008'} y={'285'} width={'312'} height={`15`} />
      </ContentLoader>
    </div>
  );
};

export default VideoCategoryLoader;
