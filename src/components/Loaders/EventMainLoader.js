import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const EventMainLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <ContentLoader
        viewBox={'0 0 375 1356'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'0'} width={'375'} height={`350`} />

        <rect x={'0'} y={'370'} width={'375'} height={`196`} />

        <rect x={'0'} y={'586'} width={'375'} height={`36`} />
        <rect x={'0'} y={'642'} width={'200'} height={`36`} />
        <rect x={'0'} y={'698'} width={'220'} height={`36`} />
        <rect x={'0'} y={'698'} width={'220'} height={`36`} />
        <rect x={'0'} y={'754'} width={'180'} height={`36`} />

        <rect x={'0'} y={'814'} width={'190'} height={`22`} />
        <rect x={'0'} y={'856'} width={'375'} height={`500`} />
      </ContentLoader>
    );
  }
  return (
    <div className={'container'}>
      <ContentLoader
        viewBox={'0 0 1320 1205'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'50'} width={'1320'} height={`700`} />

        <rect x={'0'} y={'790'} width={'620'} height={`20`} />

        <rect x={'0'} y={'820'} width={'750'} height={`600`} />
      </ContentLoader>
    </div>
  );
};

EventMainLoader.propTypes = {
  type: PropTypes.any,
};

export default EventMainLoader;
