import React from 'react';
import ContentLoader from 'react-content-loader';

const FormLoader = ({ className }) => {
  return (
    <ContentLoader className={className} viewBox={'0 0 800 1500'}>
      <rect x={'0'} y={`0`} width={'800'} height={`250`} />
      <rect x={'0'} y={`350`} width={'800'} height={`100`} />
      <rect x={'0'} y={`500`} width={'800'} height={`100`} />
      <rect x={'0'} y={`650`} width={'800'} height={`100`} />
      <rect x={'0'} y={`800`} width={'800'} height={`100`} />
      <rect x={'0'} y={`950`} width={'800'} height={`200`} />
      <rect x={'0'} y={`1250`} width={'500'} height={`150`} />
    </ContentLoader>
  );
};

export default FormLoader;
