import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsLoader = ({ type }) => {
  if (type === 'mobile') {
    return (
      <ContentLoader viewBox={'0 0 335 110'}>
        <rect x={'0'} y={'0'} width={'90'} height={`10`} />
        <rect x={'247'} y={'0'} width={'88'} height={`88`} />
        <rect x={'0'} y={'18'} width={'235'} height={`38`} />
        <rect x={'0'} y={'62'} width={'130'} height={`16`} />
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
