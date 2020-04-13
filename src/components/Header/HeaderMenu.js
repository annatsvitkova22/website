import React from 'react';

import Navigation from '../Navigation';
import Icons from '../Icons';
import Social from '../Social';

const HeaderMenu = ({ data }) => {
  return (
    <div className={'header__burgermenu'}>
      <Navigation
        navigationData={data.menus}
        className={'burger__navigation'}
      />
      <div className={'burger__icons'}>
        <a href={'#'} className={'burger__icons-item'}>
          <Icons icon={'crest'} />
        </a>
        <a href={'#'} className={'burger__icons-item'}>
          <Icons icon={'crest-location'} />
        </a>
      </div>
      <Social
        socialsData={data.info.generalInfoACF.socials}
        className={'header__social'}
      />
    </div>
  );
};

export default HeaderMenu;
