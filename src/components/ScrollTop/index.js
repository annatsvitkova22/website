import React from 'react';
import PropTypes from 'prop-types';

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

ScrollTop.propTypes = {
  className: PropTypes.string,
};

export default ScrollTop;
