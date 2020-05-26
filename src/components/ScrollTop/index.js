import React from 'react';

import Icons from '~/components/Icons';

const ScrollTop = ({ className = '' }) => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className={`scroll-top ${className}`} onClick={handleScrollTop}>
      <Icons icon={'scroll-icon'} />
    </div>
  );
};

export default ScrollTop;
