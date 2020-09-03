import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

const VideosPageLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <div className="container">
        <ContentLoader
          viewBox={'0 0 375 1120'}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
        >
          <rect x={'0'} y={'0'} width={'375'} height={`232`} />
          <rect x={'0'} y={'244'} width={'375'} height={`60`} />

          <rect x={'0'} y={'331'} width={'375'} height={`60`} />
          <rect x={'0'} y={'418'} width={'375'} height={`60`} />
          <rect x={'0'} y={'505'} width={'375'} height={`60`} />
          <rect x={'0'} y={'592'} width={'375'} height={`60`} />

          <rect x={'0'} y={'679'} width={'375'} height={`5`} />

          <rect x={'0'} y={'700'} width={'375'} height={`17`} />

          <rect x={'0'} y={'731'} width={'375'} height={`200`} />

          <rect x={'0'} y={'947'} width={'30'} height={`10`} />

          <rect x={'0'} y={'966'} width={'375'} height={`50`} />
        </ContentLoader>
      </div>
    );
  }

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

VideosPageLoader.propTypes = {
  type: PropTypes.string,
};
export default VideosPageLoader;
