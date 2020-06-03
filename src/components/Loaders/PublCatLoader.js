import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const TagsLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <ContentLoader viewBox={'0 0 335 383'}>
        <rect x={'0'} y={'0'} width={'335'} height={`350`} />
      </ContentLoader>
    );
  }
  return (
    <div className="container">
      <ContentLoader viewBox={'0 0 1320 365'}>
        <rect x={'0'} y={'0'} width={'93'} height={`17`} />
        <rect x={'0'} y={'35'} width={'312'} height={`195`} />
        <rect x={'0'} y={'245'} width={'312'} height={`15`} />
        <rect x={'0'} y={'265'} width={'50'} height={`15`} />

        <rect x={'336'} y={'0'} width={'93'} height={`17`} />
        <rect x={'336'} y={'35'} width={'423'} height={`280`} />
        <rect x={'336'} y={'330'} width={'423'} height={`15`} />
        <rect x={'336'} y={'350'} width={'50'} height={`15`} />

        <rect x={'783'} y={'0'} width={'93'} height={`17`} />
        <rect x={'783'} y={'35'} width={'312'} height={`195`} />
        <rect x={'783'} y={'245'} width={'312'} height={`15`} />
        <rect x={'783'} y={'265'} width={'50'} height={`15`} />

        <rect x={'1119'} y={'0'} width={'93'} height={`17`} />
        <rect x={'1119'} y={'35'} width={'200'} height={`120`} />
        <rect x={'1119'} y={'170'} width={'200'} height={`15`} />
        <rect x={'1119'} y={'190'} width={'50'} height={`15`} />
      </ContentLoader>
    </div>
  );
};

TagsLoader.propTypes = {
  type: PropTypes.string,
};

export default TagsLoader;
