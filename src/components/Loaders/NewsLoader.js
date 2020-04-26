import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsLoader = () => {
  return (
    <ContentLoader viewBox={'0 0 710 220'}>
      <rect x={'0'} y={'0'} width={'65'} height={`15`} />
      <rect x={'70'} y={'0'} width={'65'} height={`15`} />
      <rect x={'20'} y={'20'} width={'500'} height={`70`} />
      <rect x={'20'} y={'95'} width={'500'} height={`15`} />
      <rect x={'530'} y={'0'} width={'200'} height={`110`} />
    </ContentLoader>
  );
};

export default NewsLoader;
