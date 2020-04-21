import React from 'react';
import ContentLoader from 'react-content-loader';

const PostHeaderLoader = ({ type }) => {
  if (type === 'news') {
    return (
      <div className={'container'}>
        <ContentLoader viewBox={'0 0 1044 700'}>
          <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'60'} height={'15'} />
          <rect
            x={'0'}
            y={'20'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={'15'}
          />
          <rect
            x={'0'}
            y={'40'}
            rx={'0'}
            rx={'0'}
            width={'830'}
            height={'15'}
          />
          <rect
            x={'0'}
            y={'60'}
            rx={'0'}
            rx={'0'}
            width={'750'}
            height={'15'}
          />
          <rect
            x={'0'}
            y={'100'}
            rx={'0'}
            rx={'0'}
            width={'820'}
            height={'10'}
          />
          <rect
            x={'0'}
            y={'115'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={'10'}
          />
          <rect
            x={'0'}
            y={'130'}
            rx={'0'}
            rx={'0'}
            width={'800'}
            height={'10'}
          />
          <rect
            x={'0'}
            y={'145'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={'20'}
          />
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
  }

  if (type === 'publication') {
    return (
      <div className={'container'}>
        <ContentLoader
          viewBox={'0 0 1320 705'}
          style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
        >
          <rect
            x={'200'}
            y={'455'}
            rx={'0'}
            rx={'0'}
            width={'921'}
            height={`15`}
          />
          <rect
            x={'200'}
            y={'475'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={`20`}
          />
          <rect
            x={'200'}
            y={'500'}
            rx={'0'}
            rx={'0'}
            width={'850'}
            height={`20`}
          />
          <rect
            x={'200'}
            y={'525'}
            rx={'0'}
            rx={'0'}
            width={'921'}
            height={`10`}
          />
          <rect
            x={'200'}
            y={'540'}
            rx={'0'}
            rx={'0'}
            width={'921'}
            height={`10`}
          />
        </ContentLoader>
      </div>
    );
  }
  if (type === 'blog') {
    return (
      <div className={'container'}>
        <ContentLoader viewBox={'0 0 1044 700'}>
          <rect x={'0'} y={'0'} rx={'0'} rx={'0'} width={'60'} height={'15'} />
          <rect
            x={'0'}
            y={'20'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={'15'}
          />
          <rect
            x={'0'}
            y={'40'}
            rx={'0'}
            rx={'0'}
            width={'750'}
            height={'15'}
          />
          <rect
            x={'0'}
            y={'60'}
            rx={'0'}
            rx={'0'}
            width={'830'}
            height={'15'}
          />
          <rect
            x={'0'}
            y={'100'}
            rx={'0'}
            rx={'0'}
            width={'830'}
            height={'10'}
          />
          <rect
            x={'0'}
            y={'115'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={'10'}
          />
          <rect
            x={'0'}
            y={'130'}
            rx={'0'}
            rx={'0'}
            width={'750'}
            height={'10'}
          />
          <rect
            x={'0'}
            y={'160'}
            rx={'0'}
            rx={'0'}
            width={'875'}
            height={'20'}
          />
          <rect
            x={'0'}
            y={'200'}
            rx={'0'}
            rx={'0'}
            width={'1044'}
            height={'535'}
          />
        </ContentLoader>
      </div>
    );
  }
};

export default PostHeaderLoader;
