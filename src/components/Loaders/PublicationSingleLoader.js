import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const PublicationSingleLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <div>
        <ContentLoader viewBox={'0 0 375 500'}>
          <rect x={'0'} y={'0'} width={'375'} height={`500`} />
        </ContentLoader>
        <div
          style={{
            paddingRight: '20px',
            paddingLeft: '20px',
            marginTop: '10px',
          }}
        >
          <ContentLoader viewBox={'0 0 335 565'}>
            <rect x={'0'} y={'0'} width={'335'} height={`20`} />
            <rect x={'0'} y={'44'} width={'335'} height={`250`} />
            <rect x={'0'} y={'314'} width={'335'} height={`250`} />
          </ContentLoader>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ContentLoader
        viewBox={'0 0 1300 1100'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'0'} width={'1300'} height={`500`} />
        <rect x={'250'} y={'550'} width={'800'} height={`500`} />
      </ContentLoader>
    </div>
  );
};

PublicationSingleLoader.propTypes = {
  type: PropTypes.string,
};

export default PublicationSingleLoader;
