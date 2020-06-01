import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <ContentLoader viewBox={'0 0 876 178'}>
        <rect x={'0'} y={'0'} width={'85'} height={`22`} />
        <rect x={'672'} y={'0'} width={'200'} height={`138`} />
        <rect x={'0'} y={'32'} width={'527'} height={`74`} />
        <rect x={'0'} y={'120'} width={'213'} height={`16`} />
      </ContentLoader>
    );
  }
  return (
    <ContentLoader viewBox={'0 0 876 178'}>
      <rect x={'0'} y={'2'} width={'33'} height={`16`} />
      <rect x={'112'} y={'0'} width={'85'} height={`22`} />
      <rect x={'672'} y={'0'} width={'200'} height={`138`} />
      <rect x={'112'} y={'32'} width={'527'} height={`74`} />
      <rect x={'112'} y={'120'} width={'213'} height={`16`} />
    </ContentLoader>
  );
};

export default NewsLoader;
