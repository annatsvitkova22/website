import React from 'react';
import PropTypes from 'prop-types';

import Icons from '~/components/Icons';

const SharePopUp = ({ isVisible }) => {
  return (

    <>
      {isVisible && (
        <div className={'popup'}>
          <a href={'https://instagram.com'} target={'_blank'}>
            <Icons icon={'instagram'} />
          </a>
          <a href={'https://facebook.com'} target={'_blank'}>
            <Icons icon={'facebook'} />
          </a>
          <a href={'https://telegram.com'} target={'_blank'}>
            <Icons icon={'telegram'} />
          </a>
        </div>
      )}
    </>
  );
};

SharePopUp.propTypes = {
  isVisible: PropTypes.bool,
};

export default SharePopUp;
