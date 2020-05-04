import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';
import { times } from 'lodash';

const step = 46;

const SidebarLoader = ({ type, className }) => {
  if (type === 'popular') {
    return (
      <ContentLoader className={className} viewBox={'0 0 288 1000'}>
        {times(20, (i) => {
          return (
            <>
              <rect x={'0'} y={step*i+8} width={'288'} height={`12`} />
              <rect x={'0'} y={step*i+24} width={'200'} height={`12`} />
              <rect x={'0'} y={step*i+45} width={'288'} height={`1`} />
            </>
          );
        })}
      </ContentLoader>
    );
  }
  if (type === 'archive') {
    return (
      <ContentLoader viewBox={'0 0 390 550'}>
        <rect x={'0'} y={`0`} width={'55'} height={`18`} />
        <rect x={'0'} y={`30`} width={'103'} height={`18`} />
        <rect x={'0'} y={`88`} width={'390'} height={`336`} />
        <rect x={'0'} y={`464`} width={'360'} height={`86`} />
      </ContentLoader>
    );
  }
  return <div>Loading...</div>;
};

SidebarLoader.propTypes = {
  type: PropTypes.string,
};

export default SidebarLoader;
