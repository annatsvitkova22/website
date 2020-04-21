import React from 'react';
import ContentLoader from 'react-content-loader';

const PostHeaderLoader = () => {
  return (
    <div className={'container'}>
      <ContentLoader viewBox={'0 0 1044 700'}>
        <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'60'} height={'15'} />
        <rect x={'0'} y={'20'} rx={'0'} rx={'0'} width={'875'} height={'15'} />
        <rect x={'0'} y={'40'} rx={'0'} rx={'0'} width={'875'} height={'15'} />
        <rect x={'0'} y={'60'} rx={'0'} rx={'0'} width={'875'} height={'15'} />
        <rect x={'0'} y={'100'} rx={'0'} rx={'0'} width={'875'} height={'10'} />
        <rect x={'0'} y={'115'} rx={'0'} rx={'0'} width={'875'} height={'10'} />
        <rect x={'0'} y={'130'} rx={'0'} rx={'0'} width={'875'} height={'10'} />
        <rect x={'0'} y={'145'} rx={'0'} rx={'0'} width={'875'} height={'20'} />
        <rect
          x={'0'}
          y={'190'}
          rx={'0'}
          rx={'0'}
          width={'1044'}
          height={'535'}
        />
      </ContentLoader>
    </div>
  );
};

export default PostHeaderLoader;
