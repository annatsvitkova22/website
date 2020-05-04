import React from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';

const SidebarLoader = ({ type, className }) => {
  if (type === 'popular') {
    return (
      <ContentLoader className={className} viewBox={'0 0 425 525'}>
        <rect x={'0'} y={`0`} width={'425'} height={`20`} />
        <rect x={'0'} y={`25`} width={'425'} height={`20`} />
        <rect x={'0'} y={`50`} width={'425'} height={`20`} />
        <rect x={'0'} y={`75`} width={'380'} height={`20`} />
        <rect x={'0'} y={`100`} width={'425'} height={`20`} />
        <rect x={'0'} y={`125`} width={'425'} height={`20`} />
        <rect x={'0'} y={`150`} width={'425'} height={`20`} />
        <rect x={'0'} y={`175`} width={'380'} height={`20`} />
        <rect x={'0'} y={`200`} width={'425'} height={`20`} />
        <rect x={'0'} y={`225`} width={'425'} height={`20`} />
        <rect x={'0'} y={`250`} width={'380'} height={`20`} />
        <rect x={'0'} y={`275`} width={'425'} height={`20`} />
        <rect x={'0'} y={`300`} width={'425'} height={`20`} />
        <rect x={'0'} y={`325`} width={'380'} height={`20`} />
        <rect x={'0'} y={`350`} width={'425'} height={`50`} />
        <rect x={'0'} y={`405`} width={'425'} height={`20`} />
        <rect x={'0'} y={`430`} width={'425'} height={`20`} />
        <rect x={'0'} y={`455`} width={'380'} height={`20`} />
        <rect x={'0'} y={`480`} width={'425'} height={`20`} />
        <rect x={'0'} y={`505`} width={'425'} height={`20`} />
        <rect x={'0'} y={`530`} width={'425'} height={`20`} />
        <rect x={'0'} y={`555`} width={'380'} height={`20`} />
        <rect x={'0'} y={`580`} width={'425'} height={`20`} />
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
