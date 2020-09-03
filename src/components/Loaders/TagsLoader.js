import React from 'react';
import ContentLoader from 'react-content-loader';

import PostCardLoader from '~/components/Loaders/PostCardLoader';

const TagsLoader = ({ type }) => {
  if (type === 'desktop') {
    return (
      <div className="container">
        <ContentLoader viewBox={'0 0 1320 350'}>
          <rect x={'0'} y={'0'} width={'93'} height={`17`} />
          <rect x={'1227'} y={'0'} width={'100'} height={`17`} />

          <rect x={'0'} y={'0'} width={'200'} height={`120`} />
          <rect x={'0'} y={'135'} width={'30'} height={`15`} />
          <rect x={'0'} y={'155'} width={'200'} height={`15`} />
          <rect x={'0'} y={'175'} width={'50'} height={`15`} />

          <rect x={'224'} y={'0'} width={'200'} height={`120`} />
          <rect x={'224'} y={'135'} width={'30'} height={`15`} />
          <rect x={'224'} y={'155'} width={'200'} height={`15`} />
          <rect x={'224'} y={'175'} width={'50'} height={`15`} />

          <rect x={'448'} y={'0'} width={'423'} height={`280`} />
          <rect x={'448'} y={'295'} width={'30'} height={`15`} />
          <rect x={'448'} y={'315'} width={'423'} height={`15`} />
          <rect x={'448'} y={'335'} width={'50'} height={`15`} />

          <rect x={'895'} y={'0'} width={'200'} height={`120`} />
          <rect x={'895'} y={'135'} width={'30'} height={`15`} />
          <rect x={'895'} y={'155'} width={'200'} height={`15`} />
          <rect x={'895'} y={'175'} width={'50'} height={`15`} />

          <rect x={'1119'} y={'0'} width={'200'} height={`120`} />
          <rect x={'1119'} y={'135'} width={'30'} height={`15`} />
          <rect x={'1119'} y={'155'} width={'200'} height={`15`} />
          <rect x={'1119'} y={'175'} width={'50'} height={`15`} />
        </ContentLoader>
      </div>
    );
  }
  if (type === 'mobile') {
    return (
      <div className="container">
        <PostCardLoader type={'mobile'} />
        <PostCardLoader type={'mobile'} />
        <PostCardLoader type={'mobile'} />
        <PostCardLoader type={'mobile'} />
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default TagsLoader;
