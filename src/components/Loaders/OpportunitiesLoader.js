import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const OpportunitiesLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <ContentLoader viewBox={'0 0 375 366'}>
        <rect x={'0'} y={'0'} width={'375'} height={`181`} />

        <rect x={'0'} y={'191'} width={'375'} height={`60`} />

        <rect x={'0'} y={'261'} width={'112'} height={`23`} />

        <rect x={'0'} y={'291'} width={'90'} height={`23`} />

        <rect x={'0'} y={'319'} width={'50'} height={`23`} />
      </ContentLoader>
    );
  }
  return (
    <ContentLoader viewBox={'0 0 872 200'}>
      <rect x={'0'} y={'0'} width={'200'} height={`200`} />
      <rect x={'224'} y={'0'} width={'648'} height={`30`} />
      <rect x={'224'} y={'45'} width={'120'} height={`10`} />
      <rect x={'224'} y={'65'} width={'70'} height={`10`} />
      <rect x={'224'} y={'85'} width={'70'} height={`10`} />
      <rect x={'224'} y={'105'} width={'40'} height={`10`} />
    </ContentLoader>
  );
};

OpportunitiesLoader.propTypes = {
  type: PropTypes.string,
};

export default OpportunitiesLoader;
