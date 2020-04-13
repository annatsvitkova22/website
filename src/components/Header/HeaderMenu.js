import React from 'react';

import Navigation from '../Navigation';
import Icons from '../Icons';
import Social from '../Social';

const HeaderMenu = ({ data, isOpen }) => {
  return (
    <>
      {isOpen && (
        <div className={'header__overlay'}>
          <div className={'header__burgermenu'}>
            <Navigation navigationData={data.menus} />
            <div className={'header__icons'}>
              <a href={'#'} className={'header__icons-item'}>
                <Icons icon={'crest'} />
              </a>
              <a href={'#'} className={'header__icons-item'}>
                <Icons icon={'crest-location'} />
              </a>
            </div>
            <Social
              socialsData={data.info.generalInfoACF.socials}
              className={'header__social'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
