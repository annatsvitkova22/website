import React from 'react';
import ContentLoader from 'react-content-loader';

const ActionbarLoader = ({ type = '' }) => {
  if (type === 'wide') {
    return (
      <ContentLoader viewBox={'0 0 406 20'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'406'} height={`20`} />
      </ContentLoader>
    );
  }
  return (
    <ContentLoader viewBox={'0 0 872 30'}>
      <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'872'} height={`30`} />
    </ContentLoader>
  );
};

export default ActionbarLoader;
