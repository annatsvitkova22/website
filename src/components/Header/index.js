import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Navigation from '~/components/Navigation';
import Logo from '~/components/Logo';
import Icons from '~/components/Icons';
import HeaderMenu from '~/components/Header/HeaderMenu';
import Burger from '~/components/Header/Burger';
import SearchIcon from '~/components/Search/Icon';
import SearchField from '~/components/Search/Field';
import Dropdown from '~/components/Header/Dropdown';

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
        name
        menuItems {
          nodes {
            id
            label
            url
            menuItemACF {
              ishighlighted
            }
          }
        }
      }
    }
  }
`;

const Header = () => {
  const { loading, data } = useQuery(HEADER_QUERY);

  const router = useRouter();

  const [isPinned, setIsPinned] = useState(false);
  const [isUnPinned, setIsUnpinned] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const headerCls = classNames({
    header: true,
    'fixed-header-pinned': isPinned,
    'fixed-header-unpinned': isUnPinned,
    isMenuOpen,
  });

  const searchCls = classNames({
    isSearchMenuOpen: isSearchOpen,
  });

  const openSearch = classNames({
    'header__search-field': true,
    'header__search-field--active': isSearchOpen,
  });
  React.useEffect(() => {
    window.addEventListener('scroll', fixedHeader);
    return () => {
      window.removeEventListener('scroll', fixedHeader);
    };
  }, []);

  let scrollPos = 0;

  const fixedHeader = () => {
    if (window.scrollY < 100) {
      setIsUnpinned(false);
    }
    const st = window.scrollY;
    if (window.scrollY > 100 && st > scrollPos) {
      setIsPinned(false);
      setIsUnpinned(true);
    } else if (window.scrollY > 100 && st < scrollPos) {
      setIsPinned(true);
      setIsUnpinned(false);
    }
    scrollPos = st;
  };
  const handleOpenClick = () => {
    setIsPinned(false);
    setIsUnpinned(false);
    setIsMenuOpen(!isMenuOpen);
    !isMenuOpen
      ? document.querySelector('body').classList.add('isB-MenuOpen')
      : document.querySelector('body').classList.remove('isB-MenuOpen');
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };
  if (loading) return null;

  const handleSearch = () => {
    if (router.pathname === '/search') return false;

    return setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={`${headerCls}`}>
      <div className={'header__wrapper'}>
        <Burger handleOpenClick={handleOpenClick} className={`${searchCls}`} />
        <Link href="/">
          <a className={`header__logo ${searchCls}`}>
            <Logo
              logoData={data.info.generalInfoACF.logo}
              className={`header__logo-img`}
            />
          </a>
        </Link>
        <Navigation
          navigationData={data.menus}
          className={`navigation ${searchCls}`}
        />
        <div className={`header__icons-dd ${searchCls}`}>
          <button>Полтава</button>
          <Icons icon={'footer-chevron'} color={'white'} />
          <Dropdown data={data.menus} className={'header__dd'} />
        </div>
        <SearchIcon
          onClick={handleSearch}
          color={'white'}
          className={`header__search ${searchCls}`}
        />
        <div className={`${openSearch} header__search-wrapper`}>
          <SearchIcon
            onClick={handleSearch}
            color={'white'}
            className={'header__search'}
          />
          <SearchField onSearch={() => setIsSearchOpen(false)} />
        </div>
      </div>
      <div className={`header__overlay`} onClick={handleCloseClick}>
        <HeaderMenu data={data} />
      </div>
    </header>
  );
};

export default Header;
