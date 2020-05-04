import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation';
import Social from '../Social';

import Dropdown from '~/components/Header/Dropdown';

const HeaderMenu = ({ data }) => {


  return (
    <div className={'header__burgermenu'}>
      <Navigation
        navigationData={data.menus}
        className={'burger__navigation'}
      />
      <Dropdown data={data.menus} className={'burger__dd'} />
      <Social
        socialsData={data.info.generalInfoACF.socials}
        className={'header__social'}
      />
    </div>
  );
};

HeaderMenu.propTypes = {
  data: PropTypes.any,
};

export default HeaderMenu;
