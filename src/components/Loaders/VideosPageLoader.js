import React from 'react';
import ContentLoader from 'react-content-loader';

const VideosPageLoader = () => {
  return (
    <div className={'container'}>
      <ContentLoader
        viewBox={'0 0 1320 1305'}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
      >
        <rect x={'0'} y={'0'} width={'870'} height={`500`} />
        <rect x={'900'} y={'0'} width={'500'} height={`60`} />
        <rect x={'900'} y={'85'} width={'500'} height={`60`} />
        <rect x={'900'} y={'170'} width={'500'} height={`60`} />
        <rect x={'900'} y={'255'} width={'500'} height={`60`} />
        <rect x={'900'} y={'340'} width={'500'} height={`60`} />
        <rect x={'900'} y={'425'} width={'500'} height={`75`} />

        <rect x={'0'} y={'515'} width={'60'} height={`20`} />
        <rect x={'0'} y={'545'} width={'860'} height={`25`} />
        <rect x={'0'} y={'575'} width={'460'} height={`20`} />

        <rect x={'0'} y={'655'} width={'1300'} height={`20`} />

        <rect x={'0'} y={'700'} width={'320'} height={`300`} />
        <rect x={'340'} y={'700'} width={'320'} height={`300`} />
        <rect x={'680'} y={'700'} width={'320'} height={`300`} />
        <rect x={'1020'} y={'700'} width={'320'} height={`300`} />
      </ContentLoader>
    </div>
  );
};

export default VideosPageLoader;
