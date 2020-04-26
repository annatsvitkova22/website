import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

import ActionbarLoader from '~/components/Loaders/ActionbarLoader';

const PostCardLoader = ({ type }) => {
  if (type === 'small') {
    return (
      <ContentLoader viewBox={'0 0 425 410'}>
        <rect x={'0'} y={'0'} width={'425'} height={`250`} />
        <rect x={'0'} y={'255'} width={'60'} height={`15`} />
        <rect x={'0'} y={'275'} width={'425'} height={`10`} />
        <rect x={'0'} y={'290'} width={'425'} height={`10`} />
        <rect x={'0'} y={'305'} width={'425'} height={`10`} />
        <rect x={'0'} y={'320'} width={'425'} height={`5`} />
      </ContentLoader>
    );
  }
  if (type === 'big') {
    return (
      <ContentLoader
        viewBox={'0 0 648 430'}
        style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
      >
        <rect x={'0'} y={'270'} width={'60'} height={`15`} />
        <rect x={'0'} y={'300'} width={'600'} height={`15`} />
        <rect x={'0'} y={'320'} width={'600'} height={`15`} />
        <rect x={'0'} y={'345'} width={'60'} height={`5`} />
      </ContentLoader>
    );
  }
  if (type === 'wide') {
    return (
      <ContentLoader viewBox={'0 0 1320 410'}>
        <rect x={'0'} y={'0'} width={'660'} height={`410`} />
        <rect x={'708'} y={'100'} width={'65'} height={`15`} />
        <rect x={'708'} y={'140'} width={'560'} height={`15`} />
        <rect x={'708'} y={'160'} width={'560'} height={`15`} />
        <rect x={'708'} y={'180'} width={'560'} height={`15`} />
        <rect x={'708'} y={'200'} width={'560'} height={`15`} />
        <rect x={'708'} y={'220'} width={'560'} height={`15`} />
        <rect x={'708'} y={'240'} width={'560'} height={`15`} />
        <rect x={'708'} y={'280'} width={'65'} height={`15`} />
      </ContentLoader>
    );
  }
  return <div>Loading...</div>;
};

ActionbarLoader.propTypes = {
  type: PropTypes.string,
};

export default PostCardLoader;
