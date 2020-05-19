import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';

import Navigation from '~/components/Navigation';
import Logo from '~/components/Logo';
import HeaderMenu from '~/components/Header/HeaderMenu';
import Burger from '~/components/Header/Burger';
import SearchIcon from '~/components/Search/Icon';
import SearchField from '~/components/Search/Field';

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
  const queryData = useQuery(HEADER_QUERY);
  const { loading, data } = queryData;

  const router = useRouter();

  const [isPinned, setIsPinned] = useState(false);
  const [isUnPinned, setIsUnpinned] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [feedHeight, setFeedHeight] = useState(2355);

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
    if (router.route !== '/') {
      window.addEventListener('scroll', fixedHeader);
    }
    if (router.route === '/') {
      initialize();
    }

    return () => {
      window.removeEventListener('scroll', fixedHeader);
    };
  }, [router.route]);
  React.useEffect(() => {
    initialize();
  }, []);


  let scrollPos = 0;
  const initialize = () => {
    document.querySelector('.hero-list')
      ? setFeedHeight(document.querySelector('.hero-list').offsetHeight)
      : window.requestAnimationFrame(initialize);
    window.addEventListener('scroll', fixedHeader);
  };

  const fixedHeaderFn = () => {
    const isHome = router.route === '/';
    // TODO: replace 2000 with real feed height?
    if (window.scrollY < (isHome ? feedHeight : 100)) {
      setIsUnpinned(false);
    }
    const st = window.scrollY;
    if (window.scrollY > (isHome ? feedHeight - 200 : 100) && st > scrollPos) {
      setIsPinned(false);
      setIsUnpinned(true);
    } else if (
      window.scrollY > (isHome ? feedHeight - 200 : 100) &&
      st < scrollPos
    ) {
      setIsPinned(true);
      setIsUnpinned(false);
    }
    scrollPos = st;
  };

  const fixedHeader = _.debounce(fixedHeaderFn, 20);

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
  if (loading) return <header className={`${headerCls}`} />;

  const handleSearch = () => {
    if (router.pathname === '/search') return false;

    return setIsSearchOpen(!isSearchOpen);
  };
  return (
    <>
      {data && (
        <header className={`${headerCls}`}>
          <div className={'header__wrapper'}>
            <Burger
              handleOpenClick={handleOpenClick}
              className={`${searchCls}`}
            />
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
            {/*<div className={`header__icons-dd ${searchCls}`}>*/}
            {/*  <button>Полтава</button>*/}
            {/*  <Icons icon={'footer-chevron'} color={'white'} />*/}
            {/*  <Dropdown data={data.menus} className={'header__dd'} />*/}
            {/*</div>*/}
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
              <SearchField
                isOpen={isSearchOpen}
                onSearch={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
          <div className={`header__overlay`} onClick={handleCloseClick}>
            <HeaderMenu data={data} />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
