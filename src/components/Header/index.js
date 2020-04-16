import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navigation from '../Navigation';
import Logo from '../Logo';
import Search from '../Search';
import Icons from '../Icons';

import NavLink from '~/components/SiteLink';
import HeaderMenu from '~/components/Header/HeaderMenu';
import Burger from '~/components/Header/Burger';
import HeaderCategory from '~/components/Header/HeaderCategory';

const HEADER_QUERY = gql`
  query HeaderQuery {
    info {
      generalInfoACF {
        logo {
          mediaItemUrl
          title
        }
        socials {
          url
          name
        }
      }
    }
    menus {
      nodes {
        id
        menuItems {
          nodes {
            id
            label
            url
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, data } = useQuery(HEADER_QUERY);

  React.useEffect(() => {
    window.addEventListener('scroll', fixedHeader);
    return () => {
      window.removeEventListener('scroll', fixedHeader);
    };
  }, []);

  let scrollPos = 0;

  const fixedHeader = (event) => {
    const headerPath = document.querySelector('.header');
    debugger;
    const st = window.scrollY;
    if (window.scrollY > 100 && st > scrollPos) {
      headerPath.classList.add('fixed-header-unpinned');
      headerPath.classList.remove('fixed-header-pinned');
    } else if (st < scrollPos) {
      headerPath.classList.add('fixed-header-pinned');
      headerPath.classList.remove('fixed-header-unpinned');
    }
    if (window.scrollY > 250) {
      headerPath.classList.add('fixed-header-hidden');
    }
    if (window.scrollY > 300) {
      headerPath.classList.add('fixed-header');
    }
    scrollPos = st;
    if (window.scrollY > 500) {
      headerPath.classList.remove('fixed-header-hidden');
    }

    if (window.scrollY < 500) {
      headerPath.classList.add('fixed-header-hidden');
    }
    if (window.scrollY < 200) {
      headerPath.classList.remove('fixed-header');
      headerPath.classList.remove('fixed-header-hidden');
    }
  };
  const handleOpenClick = () => {
    const headerPath = document.querySelector('.header');

    document.querySelector('body').classList.toggle('isB-MenuOpen');
    headerPath.classList.toggle('isMenuOpen');
    headerPath.classList.remove('fixed-header-unpinned');
    headerPath.classList.remove('fixed-header-pinned');
  };

  const handleCloseClick = () => {
    const headerPath = document.querySelector('.header');

    headerPath.classList.remove('isMenuOpen');
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };
  if (loading) return null;
  return (
    <header className={`header`}>
      <div className={'header__wrapper'}>
        <Burger handleOpenClick={handleOpenClick} />
        <HeaderCategory className="navigation__list-link header__burger-category" />
        <NavLink href={'/'}>
          <Logo
            logoData={data.info.generalInfoACF.logo}
            className={'header__logo'}
          />
        </NavLink>
        <Navigation navigationData={data.menus} />
        <div className={'header__icons'}>
          <a href={'#'} className={'header__icons-item'}>
            <Icons icon={'crest'} />
          </a>
          <a href={'#'} className={'header__icons-item'}>
            <Icons icon={'crest-location'} />
          </a>
        </div>
        <div className={'header__search'}>
          <Search color={'white'} className={'header__search-link'} />
        </div>
      </div>
      <div className={`header__overlay`} onClick={handleCloseClick}>
        <HeaderMenu data={data} />
      </div>
    </header>
  );
};

export default Header;
