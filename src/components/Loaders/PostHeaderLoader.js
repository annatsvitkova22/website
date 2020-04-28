import React from 'react';
import ContentLoader from 'react-content-loader';

const PostHeaderLoader = ({ type }) => {
  if (type === 'news') {
    return (
      <div className={'container'}>
        <ContentLoader viewBox={'0 0 1044 700'}>
          <rect x={'0'} y={'0'} width={'60'} height={'15'} />
          <rect x={'0'} y={'20'} width={'875'} height={'15'} />
          <rect x={'0'} y={'40'} width={'830'} height={'15'} />
          <rect x={'0'} y={'60'} width={'750'} height={'15'} />
          <rect x={'0'} y={'100'} width={'820'} height={'10'} />
          <rect x={'0'} y={'115'} width={'875'} height={'10'} />
          <rect x={'0'} y={'130'} width={'800'} height={'10'} />
          <rect x={'0'} y={'145'} width={'875'} height={'20'} />
          <rect x={'0'} y={'190'} width={'1044'} height={'535'} />
        </ContentLoader>
      </div>
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
      <div className={'container'}>
        <ContentLoader viewBox={'0 0 1044 700'}>
          <rect x={'0'} y={'0'} width={'60'} height={'15'} />
          <rect x={'0'} y={'20'} width={'875'} height={'15'} />
          <rect x={'0'} y={'40'} width={'750'} height={'15'} />
          <rect x={'0'} y={'60'} width={'830'} height={'15'} />
          <rect x={'0'} y={'100'} width={'830'} height={'10'} />
          <rect x={'0'} y={'115'} width={'875'} height={'10'} />
          <rect x={'0'} y={'130'} width={'750'} height={'10'} />
          <rect x={'0'} y={'160'} width={'875'} height={'20'} />
          <rect x={'0'} y={'200'} width={'1044'} height={'535'} />
        </ContentLoader>
      </div>
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
