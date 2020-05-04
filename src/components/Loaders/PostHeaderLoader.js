import React from 'react';
import ContentLoader from 'react-content-loader';

const PostHeaderLoader = ({ type }) => {
  if (type === 'news') {
    return (
      <ContentLoader viewBox={'0 0 872 1300'}>
        <rect x={'0'} y={'0'} width={'85'} height={'22'} />

        <rect x={'0'} y={'40'} width={'750'} height={'34'} />
        <rect x={'0'} y={'83'} width={'850'} height={'34'} />
        <rect x={'0'} y={'126'} width={'650'} height={'34'} />

        <rect x={'0'} y={'200'} width={'872'} height={'510'} />

        <rect x={'112'} y={'750'} width={'648'} height={'44'} />

        <rect x={'112'} y={'834'} width={'648'} height={'116'} />
        <rect x={'112'} y={'950'} width={'648'} height={'270'} />
      </ContentLoader>
    );
  }

  if (type === 'publication') {
    return (
      <div className={'container'}>
        <ContentLoader
          viewBox={'0 0 1320 705'}
          style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
        >
          <rect x={'200'} y={'455'} width={'921'} height={`15`} />
          <rect x={'200'} y={'475'} width={'875'} height={`20`} />
          <rect x={'200'} y={'500'} width={'850'} height={`20`} />
          <rect x={'200'} y={'525'} width={'921'} height={`10`} />
          <rect x={'200'} y={'540'} width={'921'} height={`10`} />
        </ContentLoader>
      </div>
    );
  }
  if (type === 'blog') {
    return (
      <ContentLoader viewBox={'0 0 872 1300'}>
        <rect x={'0'} y={'0'} width={'85'} height={'22'} />

        <rect x={'0'} y={'40'} width={'750'} height={'34'} />
        <rect x={'0'} y={'83'} width={'850'} height={'34'} />
        <rect x={'0'} y={'126'} width={'650'} height={'34'} />

        <rect x={'0'} y={'200'} width={'872'} height={'510'} />

        <rect x={'112'} y={'750'} width={'648'} height={'44'} />

        <rect x={'112'} y={'834'} width={'648'} height={'116'} />
        <rect x={'112'} y={'950'} width={'648'} height={'270'} />
      </ContentLoader>
    );
  }
  if (type === 'crowdfunding') {
    return (
      <ContentLoader viewBox={'0 0 1044 1000'}>
        <rect x={'0'} y={'0'} width={'1044'} height={'535'} />
        <rect x={'0'} y={'550'} width={'60'} height={'15'} />
        <rect x={'0'} y={'570'} width={'875'} height={'15'} />
        <rect x={'0'} y={'590'} width={'750'} height={'15'} />
        <rect x={'0'} y={'630'} width={'1044'} height={'535'} />
      </ContentLoader>
    );
  }
  return null;
};

export default PostHeaderLoader;
