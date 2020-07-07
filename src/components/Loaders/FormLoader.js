import React from 'react';
import ContentLoader from 'react-content-loader';

const FormLoader = ({ className }) => {
  return (
    <ContentLoader className={className} viewBox={'0 0 500 624'}>
      <rect x={'0'} y={`0`} width={'800'} height={`250`} />
      <rect x={'0'} y={`260`} width={'800'} height={`100`} />
      <rect x={'0'} y={`350`} width={'800'} height={`80`} />
      <rect x={'0'} y={`440`} width={'800'} height={`80`} />
      <rect x={'0'} y={`530`} width={'800'} height={`80`} />
      <rect x={'0'} y={`620`} width={'800'} height={`80`} />
      <rect x={'0'} y={`730`} width={'500'} height={`100`} />
    </ContentLoader>
  );
};

export default FormLoader;
