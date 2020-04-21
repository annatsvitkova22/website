import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import Link from 'next/link';

import Navigation from '~/components/Navigation';
import Logo from '~/components/Logo';
import Icons from '~/components/Icons';
import HeaderMenu from '~/components/Header/HeaderMenu';
import Burger from '~/components/Header/Burger';
import HeaderCategory from '~/components/Header/HeaderCategory';
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

  const [isFixedHeader, setIsFixedHeader] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isUnPinned, setIsUnpinned] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const headerCls = classNames({
    header: true,
    'fixed-header-pinned': isPinned,
    'fixed-header-unpinned': isUnPinned,
    'fixed-header-hidden': isHidden,
    'fixed-header': isFixedHeader,
  });
  React.useEffect(() => {
    window.addEventListener('scroll', fixedHeader);
    return () => {
      window.removeEventListener('scroll', fixedHeader);
    };
  }, []);

  let scrollPos = 0;

  const fixedHeader = (event) => {
    const st = window.scrollY;
    if (window.scrollY > 100 && st > scrollPos) {
      setIsPinned(false);
      setIsUnpinned(true);
    } else if (window.scrollY > 100 && st < scrollPos) {
      setIsPinned(true);
      setIsUnpinned(false);
    }
    if (window.scrollY > 250) {
      setIsHidden(true);
    }
    if (window.scrollY > 300) {
      setIsFixedHeader(true);
    }
    scrollPos = st;
    if (window.scrollY > 500) {
      setIsHidden(false);
    }

    if (window.scrollY < 250) {
      setIsHidden(false);
    }
    if (window.scrollY < 300) {
      setIsFixedHeader(false);
    }
  };
  const handleOpenClick = () => {
    const headerPath = document.querySelector('.header');

    document.querySelector('body').classList.toggle('isB-MenuOpen');
    headerPath.classList.toggle('isMenuOpen');
    setIsPinned(false);
    setIsUnpinned(false);
  };

  const handleCloseClick = () => {
    const headerPath = document.querySelector('.header');

    headerPath.classList.remove('isMenuOpen');
    document.querySelector('body').classList.remove('isB-MenuOpen');
  };
  if (loading) return null;

  console.log(isSearchOpen);

  return (
    <header className={`${headerCls}`}>
      <div className={'header__wrapper'}>
        <Burger handleOpenClick={handleOpenClick} />
        <HeaderCategory className="navigation__list-link header__burger-category" />
        <Link href="/">
          <a>
            <Logo
              logoData={data.info.generalInfoACF.logo}
              className={'header__logo'}
            />
          </a>
        </Link>
        <Navigation navigationData={data.menus} />
        <div className={'header__icons'}>
          <a href={'#'} className={'header__icons-item'}>
            <Icons icon={'crest'} />
          </a>
          <a href={'#'} className={'header__icons-item'}>
            <Icons icon={'crest-location'} />
          </a>
        </div>
        <SearchIcon
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          color={'white'}
          className={'header__search'}
        />
        {isSearchOpen && (
          <SearchField onSearch={() => setIsSearchOpen(false)} />
        )}
      </div>
      <div className={`header__overlay`} onClick={handleCloseClick}>
        <HeaderMenu data={data} />
      </div>
    </header>
  );
};

export default Header;
